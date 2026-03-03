import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Import sample management functions
import { 
  scanSamples, 
  scanDirectory, 
  getFileInfo, 
  SAMPLES_DIR, 
  OUTPUT_FILE, 
  TIMESTAMP_FILE 
} from './src/sampleManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const HAS_DIST = fs.existsSync(DIST_DIR);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());

// Serve public assets and, when available, the built client bundle.
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-store');
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
  }
}));

if (HAS_DIST) {
  app.use(express.static(DIST_DIR, {
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'no-store');
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (path.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      }
    }
  }));
}

app.use(express.json());

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = req.body.category || 'uploads';
    const fullPath = path.join(SAMPLES_DIR, uploadDir);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    // Keep original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// API Routes

// Get all samples info
app.get('/api/samples', (req, res) => {
  try {
    if (!fs.existsSync(OUTPUT_FILE)) {
      return res.json({ error: 'samples.json not found. Run scan-samples first.' });
    }
    
    const samplesData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    res.json(samplesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get directory structure
app.get('/api/samples/directory', (req, res) => {
  try {
    const directoryStructure = scanDirectory(SAMPLES_DIR, SAMPLES_DIR);
    res.json(directoryStructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Scan and update samples
app.post('/api/samples/scan', (req, res) => {
  try {
    const sampleMap = scanSamples(SAMPLES_DIR);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
    
    // Update timestamp
    const timestampData = { 
      lastScanned: new Date().toISOString(),
      sampleCount: Object.keys(sampleMap).length,
      totalFiles: Object.values(sampleMap).reduce((sum, files) => 
        sum + (Array.isArray(files) ? files.length : 1), 0)
    };
    fs.writeFileSync(TIMESTAMP_FILE, JSON.stringify(timestampData, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Samples scanned successfully',
      ...timestampData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload files
app.post('/api/upload', upload.array('files'), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      category: req.body.category || 'uploads'
    }));

    // Automatically scan samples after upload
    setTimeout(() => {
      try {
        const sampleMap = scanSamples(SAMPLES_DIR);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
      } catch (error) {
        console.error('Failed to scan samples after upload:', error);
      }
    }, 100);

    res.json({ 
      success: true, 
      message: `${uploadedFiles.length} files uploaded successfully`,
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new category/folder
app.post('/api/categories', (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const categoryPath = path.join(SAMPLES_DIR, name);
    if (fs.existsSync(categoryPath)) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    fs.mkdirSync(categoryPath, { recursive: true });
    res.json({ success: true, message: `Category '${name}' created successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a file or folder
app.delete('/api/samples', (req, res) => {
  try {
    const { path: itemPath } = req.body;
    if (!itemPath) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const fullPath = path.join(SAMPLES_DIR, itemPath);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File or folder not found' });
    }

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }

    // Automatically scan samples after deletion
    setTimeout(() => {
      try {
        const sampleMap = scanSamples(SAMPLES_DIR);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
      } catch (error) {
        console.error('Failed to scan samples after deletion:', error);
      }
    }, 100);

    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get scan timestamp info
app.get('/api/samples/status', (req, res) => {
  try {
    if (!fs.existsSync(TIMESTAMP_FILE)) {
      return res.json({ scanned: false });
    }

    const timestampData = JSON.parse(fs.readFileSync(TIMESTAMP_FILE, 'utf8'));
    res.json({ scanned: true, ...timestampData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if (HAS_DIST) {
  app.get(/^\/(?!api).*/, (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res
      .status(503)
      .send("Client bundle not built. Run 'npm run build' for port 3001, or use 'npm run dev' for the Vite dev server.");
  });
}

// API Routes
app.get('/api/samples', (req, res) => {
  try {
    if (!fs.existsSync(OUTPUT_FILE)) {
      return res.json({ error: 'samples.json not found. Run scan-samples first.' });
    }
    
    const samplesData = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    res.json(samplesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get directory structure
app.get('/api/samples/directory', (req, res) => {
  try {
    const directoryStructure = scanDirectory(SAMPLES_DIR, SAMPLES_DIR);
    res.json(directoryStructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Scan and update samples
app.post('/api/samples/scan', (req, res) => {
  try {
    const sampleMap = scanSamples(SAMPLES_DIR);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
    
    // Update timestamp
    const timestampData = { 
      lastScanned: new Date().toISOString(),
      sampleCount: Object.keys(sampleMap).length,
      totalFiles: Object.values(sampleMap).reduce((sum, files) => 
        sum + (Array.isArray(files) ? files.length : 1), 0)
    };
    fs.writeFileSync(TIMESTAMP_FILE, JSON.stringify(timestampData, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Samples scanned successfully',
      ...timestampData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload files
app.post('/api/upload', upload.array('files'), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      category: req.body.category || 'uploads'
    }));

    // Automatically scan samples after upload
    setTimeout(() => {
      try {
        const sampleMap = scanSamples(SAMPLES_DIR);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
      } catch (error) {
        console.error('Failed to scan samples after upload:', error);
      }
    }, 100);

    res.json({ 
      success: true, 
      message: `${uploadedFiles.length} files uploaded successfully`,
      files: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new category/folder
app.post('/api/categories', (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const categoryPath = path.join(SAMPLES_DIR, name);
    if (fs.existsSync(categoryPath)) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    fs.mkdirSync(categoryPath, { recursive: true });
    res.json({ success: true, message: `Category '${name}' created successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a file or folder
app.delete('/api/samples', (req, res) => {
  try {
    const { path: itemPath } = req.body;
    if (!itemPath) {
      return res.status(400).json({ error: 'Path is required' });
    }

    const fullPath = path.join(SAMPLES_DIR, itemPath);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File or folder not found' });
    }

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(fullPath);
    }

    // Automatically scan samples after deletion
    setTimeout(() => {
      try {
        const sampleMap = scanSamples(SAMPLES_DIR);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
      } catch (error) {
        console.error('Failed to scan samples after deletion:', error);
      }
    }, 100);

    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get scan timestamp info
app.get('/api/samples/status', (req, res) => {
  try {
    if (!fs.existsSync(TIMESTAMP_FILE)) {
      return res.json({ scanned: false });
    }

    const timestampData = JSON.parse(fs.readFileSync(TIMESTAMP_FILE, 'utf8'));
    res.json({ scanned: true, ...timestampData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve the main app for specific routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Debug endpoint to check MIME types
app.get('/debug/mime', (req, res) => {
  const testFile = path.join(__dirname, 'src/main.js');
  if (fs.existsSync(testFile)) {
    res.json({
      exists: true,
      path: testFile,
      url: '/src/main.js'
    });
  } else {
    res.json({
      exists: false,
      path: testFile
    });
  }
});

// Catch-all handler for 404s
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Periodic sample checking
let lastScanTime = 0;
const SCAN_INTERVAL = 5 * 60 * 1000; // 5 minutes

function checkForNewSamples() {
  try {
    if (!fs.existsSync(SAMPLES_DIR)) {
      return;
    }

    const currentTimestamps = new Map();
    
    function collectTimestamps(dir, relativePath = '') {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        if (item.name.startsWith('.')) continue;
        
        const itemPath = path.join(dir, item.name);
        const itemRelativePath = path.join(relativePath, item.name);
        
        if (item.isDirectory()) {
          collectTimestamps(itemPath, itemRelativePath);
        } else {
          const stats = fs.statSync(itemPath);
          currentTimestamps.set(itemRelativePath, stats.mtime.getTime());
        }
      }
    }
    
    collectTimestamps(SAMPLES_DIR);
    
    // Check if we have timestamp data from previous scan
    let shouldScan = !fs.existsSync(TIMESTAMP_FILE);
    
    if (!shouldScan) {
      try {
        const timestampData = JSON.parse(fs.readFileSync(TIMESTAMP_FILE, 'utf8'));
        lastScanTime = new Date(timestampData.lastScanned).getTime();
        
        // Check if any files are newer than last scan
        for (const [filePath, fileTime] of currentTimestamps) {
          if (fileTime > lastScanTime) {
            shouldScan = true;
            break;
          }
        }
      } catch (error) {
        shouldScan = true;
      }
    }
    
    if (shouldScan) {
      console.log('🔄 Detected changes, scanning samples...');
      const sampleMap = scanSamples(SAMPLES_DIR);
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
      
      const timestampData = { 
        lastScanned: new Date().toISOString(),
        sampleCount: Object.keys(sampleMap).length,
        totalFiles: Object.values(sampleMap).reduce((sum, files) => 
          sum + (Array.isArray(files) ? files.length : 1), 0)
      };
      fs.writeFileSync(TIMESTAMP_FILE, JSON.stringify(timestampData, null, 2));
      
      console.log(`✅ Updated samples.json: ${timestampData.sampleCount} banks, ${timestampData.totalFiles} files`);
      
      // Notify connected clients (could implement WebSocket later)
      lastScanTime = Date.now();
    }
  } catch (error) {
    console.error('❌ Periodic check failed:', error.message);
  }
}

// Start periodic checking
setInterval(checkForNewSamples, SCAN_INTERVAL);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 WarpSong server running on http://localhost:${PORT}`);
  console.log(`📁 Samples directory: ${SAMPLES_DIR}`);
  console.log(`🎵 Frontend available at http://localhost:${PORT}`);
  console.log(`🔄 Auto-scan enabled: checking every ${SCAN_INTERVAL / 1000} seconds`);
  
  // Initial scan if needed
  if (!fs.existsSync(OUTPUT_FILE)) {
    console.log('📋 Initial sample scan...');
    try {
      const sampleMap = scanSamples(SAMPLES_DIR);
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
      console.log(`✅ Found ${Object.keys(sampleMap).length} sample banks`);
    } catch (error) {
      console.error('❌ Initial scan failed:', error.message);
    }
  }
  
  // Start periodic checking after a short delay
  setTimeout(checkForNewSamples, 2000);
});

export default app;
