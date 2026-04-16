const mongoose = require('mongoose');
const Contact = require('./models/Contact.js');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tourMitraDB';

mongoose.connect(MONGO_URI).then(async () => {
  const contacts = await Contact.find({});
  console.log('Contacts found in DB:');
  console.log(JSON.stringify(contacts, null, 2));
  process.exit(0);
}).catch(err => {
  console.error('Connection error:', err.message);
  process.exit(1);
});
