const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Add import if not present and if URL exists in file
  if (content.includes('http://16.16.184.208:5001') && !content.includes('API_BASE_URL')) {
    // Insert import after the last import line
    const lines = content.split('\n');
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import ')) {
            lastImportIndex = i;
        }
    }
    
    // Determine relative path for import
    const relativeDepth = filePath.split(srcDir)[1].split(path.sep).length - 2;
    const importPath = relativeDepth === 0 ? './apiConfig' : '../'.repeat(relativeDepth) + 'apiConfig';
    
    lines.splice(lastImportIndex + 1, 0, `import { API_BASE_URL } from "${importPath}";`);
    content = lines.join('\n');
  }

  // Replace hardcoded URL
  // Matches both http://16.16.184.208:5001 and http://localhost:5001
  const updatedContent = content.replace(/http:\/\/(16\.16\.184\.208|localhost):5001/g, '${API_BASE_URL}');
  
  // Note: Since I'm replacing with template literal, I need to ensure the surrounding quotes are backticks
  // Let's do a more careful replacement for fetch calls
  const finalContent = updatedContent.replace(/fetch\("(\${API_BASE_URL}.*?)"/g, 'fetch(`$1`');

  if (finalContent !== original) {
    fs.writeFileSync(filePath, finalContent);
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
