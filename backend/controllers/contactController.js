const Contact = require('../models/Contact');

// @desc    Submit a contact form query
// @route   POST /api/contact
// @access  Public
const submitQuery = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const contact = new Contact({
      name,
      email,
      message
    });

    const createdContact = await contact.save();
    res.status(201).json({ message: 'Query submitted successfully', data: createdContact });
  } catch (error) {
    res.status(500).json({ message: 'Server error while submitting query' });
  }
};

const getQueries = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching queries' });
  }
};

const getMyQueries = async (req, res) => {
  try {
    const contacts = await Contact.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching your queries' });
  }
};

const replyToQuery = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      // Create a conversation thread payload
      const sender = req.body.sender || 'admin';
      
      // If there's an existing reply string but thread is empty, migrate it
      if (contact.reply && contact.thread.length === 0) {
        contact.thread.push({ sender: 'admin', text: contact.reply, timestamp: contact.updatedAt });
        contact.reply = null; // optional cleanup
      }
      
      // Add the new reply to the thread
      if (req.body.reply) {
         contact.thread.push({ sender, text: req.body.reply });
      }
      
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error while replying to query' });
  }
};


module.exports = { submitQuery, getQueries, getMyQueries, replyToQuery };
