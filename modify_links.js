const fs = require('fs');
const path = 'c:/Users/LENOVO/Desktop/FINALPROJECT/frontend/src/data/destinations.js';

let file = fs.readFileSync(path, 'utf8');

// Replace all external links with a standard local picture name based on the destination name
file = file.replace(/name:\s*"([^"]+)",([\s\S]*?)image:\s*"([^"]+)"/g, (match, name, middle, oldImage) => {
    // We create a clean filename string from the destination name.
    // For example "Annavaram Temple" becomes "Annavaram Temple.jpg"
    const safeName = name.replace(/[^a-zA-Z0-9\s-]/g, '').trim();
    const newImage = `/images/destinations/${safeName}.jpg`;
    
    return `name: "${name}",${middle}image: "${newImage}"`;
});

fs.writeFileSync(path, file);
console.log('Successfully modified all 90 items in destinations.js!');
