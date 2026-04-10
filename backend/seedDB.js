const mongoose = require('mongoose');
const dotenv = require('dotenv');
const District = require('./models/District');
const Destination = require('./models/Destination');

// Import from frontend static data
const { districtMeta, destinations } = require('../frontend/src/data/destinations.js');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await District.deleteMany();
    await Destination.deleteMany();

    const districtMap = {};

    for (const key of Object.keys(districtMeta)) {
      const meta = districtMeta[key];
      const createdDistrict = await District.create({
        id: key,
        name: meta.title,
        description: meta.description,
        image: meta.hero,
      });
      // key is like "east-godavari"
      districtMap[key] = createdDistrict._id;
    }

    const destinationsToInsert = destinations.map(d => ({
      districtId: districtMap[d.district],
      name: d.name,
      description: d.shortDescription || d.description,
      image: d.image,
      category: d.category,
      rating: d.rating,
      location: d.location
    }));

    await Destination.insertMany(destinationsToInsert);

    console.log('Data Imported successfully into MongoDB!');
    process.exit();
  } catch (error) {
    console.error(`Error starting import: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(importData);
