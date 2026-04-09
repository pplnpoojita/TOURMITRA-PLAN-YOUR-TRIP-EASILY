const fs = require('fs');

const filePath = 'c:/Users/LENOVO/Desktop/FINALPROJECT/frontend/src/data/destinations.js';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/name:\s*"([^"]+)",([\s\S]*?)location:\s*"([^"]+)",([\s\S]*?)mapsUrl:\s*"([^"]+)"/g, (match, name, middle1, location, middle2, oldMapsUrl) => {
    // Determine the best query string
    let searchQuery = location;
    if (!location.toLowerCase().includes(name.toLowerCase())) {
        searchQuery = `${name}, ${location}`;
    }
    
    // Use directions API for a route map
    const newMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(searchQuery)}`;
    return `name: "${name}",${middle1}location: "${location}",${middle2}mapsUrl: "${newMapsUrl}"`;
});

fs.writeFileSync(filePath, content);
console.log('Updated mapsUrl for all destinations to directions (route map) URLs!');
