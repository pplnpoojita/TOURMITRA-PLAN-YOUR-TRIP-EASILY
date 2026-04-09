const mongoose = require('mongoose');
const Contact = require('./models/Contact.js');

mongoose.connect('mongodb://127.0.0.1:27017/tourMitraDB').then(async () => {
  const contacts = await Contact.find({});
  console.log(JSON.stringify(contacts, null, 2));
  process.exit(0);
});
