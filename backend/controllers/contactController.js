const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/email');

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

    // 1. Send Notification to Admin
    try {
      await sendEmail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Inquiry from ${name}`,
        html: `
          <h3>New Message Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });

      // 2. Send Auto-reply to User
      await sendEmail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Tour Mitra',
        html: `
          <h3>Hello ${name},</h3>
          <p>Thank you for reaching out to Tour Mitra! We have received your message and our team will get back to you shortly.</p>
          <br/>
          <p><strong>Your Message:</strong></p>
          <p><em>${message}</em></p>
          <br/>
          <p>Best Regards,</p>
          <p>The Tour Mitra Team</p>
        `
      });
    } catch (emailError) {
      // Log the error but don't fail the entire request, since the record is already saved in DB
      console.error('Email notification failed but query was saved in DB:', emailError.message);
    }

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
