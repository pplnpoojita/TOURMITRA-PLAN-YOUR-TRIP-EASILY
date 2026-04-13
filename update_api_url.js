const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('http://localhost:5001')) {
    const updated = content.replace(/http:\/\/localhost:5001/g, 'http://16.16.184.208:5001');
    fs.writeFileSync(filePath, updated);
    console.log('Updated ' + filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

processDir(path.join(__dirname, 'frontend', 'src'));
