import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLES_DIR = path.resolve(__dirname, '../public/samples');
const OUTPUT_FILE = path.resolve(__dirname, '../public/samples.json');
const TIMESTAMP_FILE = path.resolve(__dirname, '../public/samples-timestamp.json');

// MIME type mapping for different file types
const MIME_TYPES = {
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.flac': 'audio/flac',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif'
};

function scanSamples(dir) {
  const samples = {};
  
  function processDir(currentPath, relativePath) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });
    items.sort((a, b) => a.name.localeCompare(b.name));

    const files = [];
    
    for (const item of items) {
      if (item.name.startsWith('.') || item.name === 'README.txt') continue;
      
      const itemPath = path.join(currentPath, item.name);
      const itemRelPath = path.join(relativePath, item.name);

      if (item.isDirectory()) {
        if (relativePath === "") {
          const bankFiles = getFilesRecursively(itemPath);
          if (bankFiles.length > 0) {
            samples[item.name] = bankFiles.map(f => {
              const fullPath = `/samples/${item.name}/${f}`;
              return fullPath.split('/').map(encodeURIComponent).join('/');
            });
          }
        }
      } else {
        files.push(itemRelPath);
      }
    }
    
    if (relativePath === "" && files.length > 0) {
      files.forEach(f => {
        const name = path.parse(f).name;
        const fullPath = `/samples/${f}`;
        samples[name] = fullPath.split('/').map(encodeURIComponent).join('/');
      });
    }
  }

  function getFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });
    list.sort((a, b) => a.name.localeCompare(b.name));
    
    for (const item of list) {
      if (item.name.startsWith('.')) continue;
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        const subFiles = getFilesRecursively(fullPath);
        results = results.concat(subFiles.map(f => `${item.name}/${f}`));
      } else {
        results.push(item.name);
      }
    }
    return results;
  }

  processDir(dir, "");
  return samples;
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function getFileInfo(filePath, relativeTo = SAMPLES_DIR) {
  const stats = fs.statSync(filePath);
  const relativePath = path.relative(relativeTo, filePath);
  const webPath = `/samples/${relativePath}`.split('/').map(encodeURIComponent).join('/');
  
  return {
    name: path.basename(filePath),
    path: relativePath,
    webPath: webPath,
    size: stats.size,
    modified: stats.mtime,
    mimeType: getMimeType(filePath),
    isDirectory: stats.isDirectory()
  };
}

function scanDirectory(dirPath, relativeTo = SAMPLES_DIR) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const results = [];
  
  for (const item of items) {
    if (item.name.startsWith('.')) continue;
    
    const fullPath = path.join(dirPath, item.name);
    const info = getFileInfo(fullPath, relativeTo);
    
    if (item.isDirectory()) {
      info.children = scanDirectory(fullPath, relativeTo);
    }
    
    results.push(info);
  }
  
  return results.sort((a, b) => {
    // Directories first, then files
    if (a.isDirectory !== b.isDirectory) {
      return b.isDirectory ? 1 : -1;
    }
    return a.name.localeCompare(b.name);
  });
}

export {
  scanSamples,
  scanDirectory,
  getFileInfo,
  getMimeType,
  SAMPLES_DIR,
  OUTPUT_FILE,
  TIMESTAMP_FILE
};