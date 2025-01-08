const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios'); // For Amadeus API integration
const flightAPI = require('./routes/flightAPI');
const flightBooking = require('./routes/flightBooking');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const flightRoutes = require('./routes/flightRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const nodemailer = require('nodemailer'); // Import nodemailer

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', flightBooking);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/flights-api', flightAPI.router);
app.use('/api/contact', contactRoutes);

// Send email route
app.post('/api/send-email', async (req, res) => {
  const { recipient, subject, body } = req.body;

  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail as the email service provider
    auth: {
      user: 'kaytwobaba@gmail.com', // Your email address
      pass: 'icvlrpviamkrbjqu', // Your Google app-specific password
    },
  });

  const mailOptions = {
    from: 'kaytwobaba@gmail.com', // Sender address
    to: recipient, // Recipient email address
    subject: subject, // Subject line
    text: body, // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// Serve React build files
const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
