const express = require('express');
const nodemailer = require('nodemailer'); // Import nodemailer
const router = express.Router();

// Email transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kaytwobaba@gmail.com',
    pass: 'icvlrpviamkrbjqu' // Your Google app password
  }
});

// Route to handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // Sender's email
    to: 'kaytwobaba@gmail.com', // Your email address to receive messages
    subject: `New Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions); // Send email
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ message: 'An error occurred while sending your message. Please try again.' });
  }
});

module.exports = router;
