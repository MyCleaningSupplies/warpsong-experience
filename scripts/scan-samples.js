
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLES_DIR = path.resolve(__dirname, '../public/samples');
const OUTPUT_FILE = path.resolve(__dirname, '../public/samples.json');

function scanSamples(dir) {
  const samples = {};
  
  // Helper to process a directory
  function processDir(currentPath, relativePath) {
    const items = fs.readdirSync(currentPath, { withFileTypes: true });
    
    // Sort items to ensure deterministic order for .n() indexing
    items.sort((a, b) => a.name.localeCompare(b.name));

    const files = [];
    
    for (const item of items) {
      if (item.name.startsWith('.') || item.name === 'README.txt') continue;
      
      const itemPath = path.join(currentPath, item.name);
      const itemRelPath = path.join(relativePath, item.name); // e.g. "bassoneshots/kick.wav"

      if (item.isDirectory()) {
        // Recursively scan, treating subfolders as their own banks if they contain files
        if (relativePath === "") {
          // Top level folder -> Bank
          const bankFiles = getFilesRecursively(itemPath);
          if (bankFiles.length > 0) {
            // Map bank name to array of paths
            // Use absolute paths from web root: "/samples/..."
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
    
    // Files at the root of public/samples
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
        // Prepend current folder name to relative paths
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

const sampleMap = scanSamples(SAMPLES_DIR);

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sampleMap, null, 2));
console.log(`Generated sample map at ${OUTPUT_FILE}`);
console.log(`Found ${Object.keys(sampleMap).length} banks/samples.`);
