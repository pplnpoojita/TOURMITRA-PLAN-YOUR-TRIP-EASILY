const fs = require('fs');
const path = require('path');

const destinationsFile = path.join(__dirname, 'frontend/src/data/destinations.js');
const imagesDir = path.join(__dirname, 'frontend/public/images/destinations');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
    console.log(`Error: The directory ${imagesDir} does not exist.`);
    console.log(`Please create it and add your images there first.`);
    process.exit(1);
}

// Read the available images in the folder
const availableImages = fs.readdirSync(imagesDir).filter(file => {
   const ext = path.extname(file).toLowerCase();
   return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
});
console.log(`Found ${availableImages.length} images in your public/images/destinations folder.`);

if (availableImages.length === 0) {
    console.log("No images found. Please copy your picture files into the frontend/public/images/destinations folder and run this script again.");
    process.exit(0);
}

const data = fs.readFileSync(destinationsFile, 'utf8');

// We will replace the image path based on the 'name' property
let updatedData = data.replace(/name:\s*"([^"]+)",([\s\S]*?)image:\s*"([^"]+)"/g, (match, name, middle, oldImage) => {
    
    // Check if an image file exists that includes the name (case-insensitive)
    const matchingImage = availableImages.find(file => {
        // e.g. if name is "Annavaram Temple", we look for "annavaram temple.jpg" or "annavaram.jpg"
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanFile = file.split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Match if the filename contains the destination name, or vice versa
        return cleanFile.includes(cleanName) || cleanName.includes(cleanFile);
    });
    
    if (matchingImage) {
        // We found a local image that matches! Link it.
        const newImage = `/images/destinations/${matchingImage}`;
        console.log(`Matched: "${name}" -> ${newImage}`);
        return `name: "${name}",${middle}image: "${newImage}"`;
    } else {
        // Keep the old image if no local file matched
        return match;
    }
});

fs.writeFileSync(destinationsFile, updatedData);
console.log('Successfully updated destinations.js with the local images found!');
