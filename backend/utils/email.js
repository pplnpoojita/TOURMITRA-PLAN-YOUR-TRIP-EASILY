const nodemailer = require('nodemailer');

/**
 * Creates a transporter for sending emails via Gmail.
 * Uses environment variables EMAIL_USER and EMAIL_PASS.
 */
const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('⚠️ Warning: EMAIL_USER or EMAIL_PASS not found in environment variables.');
    return null;
  }

  if (pass === 'your-16-char-app-password') {
    console.error('❌ Error: EMAIL_PASS is still set to the placeholder. Please use a Google App Password.');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/**
 * Sends an email using the provided options.
 * @param {Object} mailOptions - Options like { from, to, subject, html }
 */
const sendEmail = async (mailOptions) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    throw new Error('Email transporter not configured correctly. Check EMAIL_USER and EMAIL_PASS.');
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error in sendEmail utility:', error.message);
    throw error;
  }
};

module.exports = { createTransporter, sendEmail };
