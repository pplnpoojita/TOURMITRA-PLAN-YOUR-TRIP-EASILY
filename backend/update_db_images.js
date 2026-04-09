const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/finalproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected for Migration'))
  .catch(err => console.error(err));

// Destination Model Definition
const destinationSchema = mongoose.Schema({
  districtId: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

const Destination = mongoose.model('Destination_Migration', destinationSchema, 'destinations');

const migrateImages = async () => {
    try {
        console.log("Reading destinations.js file from frontend...");
        const content = fs.readFileSync('../frontend/src/data/destinations.js', 'utf8');
        
        // Extract all image paths using regex
        const imageMatches = Array.from(content.matchAll(/image:\s*"([^"]+)"/g)).map(m => m[1]);
        console.log(`Found ${imageMatches.length} local images defined in destinations.js`);

        const destinations = await Destination.find({});
        console.log(`Found ${destinations.length} destinations in database`);

        let updatedCount = 0;

        for (let dest of destinations) {
            let cleanName = dest.name.replace(/\s*\(.*?\)\s*/g, '').trim();
            let firstWord = cleanName.split(' ')[0];
            
            let localImage = imageMatches.find(img => {
                const imgName = img.split('/').pop().split('.')[0];
                return img.includes(cleanName) || cleanName.includes(imgName) || (imgName.includes(firstWord) && cleanName.length > 3);
            });
            
            if (localImage) {
                // If it already is the local image, just skip
                if (dest.image !== localImage) {
                    dest.image = localImage;
                    await dest.save();
                    console.log(`Updated ${dest.name}: -> ${localImage}`);
                    updatedCount++;
                } else {
                    console.log(`Skipped ${dest.name}: already local (${dest.image})`);
                }
            } else {
                console.log(`Warning: Could not find matching local image for ${dest.name}`);
            }
        }

        console.log(`Migration Complete: ${updatedCount} records updated.`);
        process.exit();
    } catch (err) {
        console.error("Migration failed: ", err);
        process.exit(1);
    }
}

migrateImages();
