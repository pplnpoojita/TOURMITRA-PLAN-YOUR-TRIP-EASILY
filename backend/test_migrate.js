const mongoose = require('mongoose');
const Contact = require('./models/Contact.js');

mongoose.connect('mongodb://127.0.0.1:27017/tourMitraDB').then(async () => {
  try {
    const contact = await Contact.findById('69d3539ad41855c39365e3c6');
    console.log("Before:", contact);
    if (contact.reply && contact.thread.length === 0) {
      contact.thread.push({ sender: 'admin', text: contact.reply, timestamp: contact.updatedAt });
      contact.reply = null;
    }
    contact.thread.push({ sender: 'admin', text: 'Migration test reply' });
    await contact.save();
    console.log("After:", contact);
  } catch (err) {
    console.error("Crash:", err);
  }
  process.exit(0);
});
