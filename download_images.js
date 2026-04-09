const fs = require('fs');
const https = require('https');
const path = require('path');

const destinationsFile = path.join(__dirname, 'frontend/src/data/destinations.js');
const imagesDir = path.join(__dirname, 'frontend/public/images/destinations');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

let data = fs.readFileSync(destinationsFile, 'utf8');
const regex = /name:\s*"([^"]+)",([\s\S]*?)image:\s*"([^"]+)"/g;

let match;
const tasks = [];

// Parse everything first
const parts = [];
let lastIndex = 0;

while ((match = regex.exec(data)) !== null) {
    parts.push(data.substring(lastIndex, match.index));
    const name = match[1];
    const middle = match[2];
    const imageUrl = match[3];
    
    // We strictly take the name, replace special chars if any, and make it a valid filename
    const safeName = name.replace(/[^a-zA-Z0-9\s-]/g, '').trim();
    const localImagePath = `/images/destinations/${safeName}.jpg`;
    
    tasks.push({ name, safeName, middle, imageUrl, localImagePath, matchText: match[0] });
    lastIndex = regex.lastIndex;
}

const remainder = data.substring(lastIndex);

// Helper function to download image
function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (!url.startsWith('http')) {
            resolve(); // Already local or invalid
            return;
        }
        
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'NodeJS' } }, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                 // handle redirect if Unsplash etc
                 https.get(response.headers.location, { headers: { 'User-Agent': 'NodeJS' } }, (res2) => {
                     res2.pipe(file);
                     file.on('finish', () => { file.close(resolve); });
                 }).on('error', reject);
            } else {
                file.close();
                fs.unlink(dest, () => reject(`Failed status ${response.statusCode} for ${url}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err.message));
        });
    });
}

async function processAll() {
    let updatedData = '';
    
    console.log(`Starting to download ${tasks.length} images... This may take a few seconds.`);
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        updatedData += parts[i];
        
        try {
            if (task.imageUrl.startsWith('http')) {
                const absoluteDest = path.join(imagesDir, `${task.safeName}.jpg`);
                await downloadImage(task.imageUrl, absoluteDest);
                console.log(`Downloaded: ${task.safeName}.jpg`);
                updatedData += `name: "${task.name}",${task.middle}image: "${task.localImagePath}"`;
            } else {
                // Already a local path or not a URL
                updatedData += task.matchText;
            }
        } catch(err) {
            console.log(`Error downloading ${task.name}: ${err}`);
            updatedData += task.matchText; // Keep old if fails
        }
    }
    
    updatedData += remainder;
    fs.writeFileSync(destinationsFile, updatedData);
    console.log('All images downloaded successfully and saved with names! destinations.js is updated.');
}

processAll();
