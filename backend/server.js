const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const flightAPI = require('./routes/flightAPI');
const flightBooking = require('./routes/flightBooking');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const flightRoutes = require('./routes/flightRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const sendEmail = require('./sendEmail'); // Import sendEmail utility
const db = require('./models'); // Import db

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
app.use('/api/booking', flightBooking.router); // Ensure to use the router from flightBooking
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/flights-api', flightAPI.router); // Ensure to use the router from flightAPI
app.use('/api/contact', contactRoutes);

// Booking confirmation route
app.post('/api/bookings/confirm', async (req, res) => {
  const { userId, bookingDetails } = req.body;

  try {
    // Save booking details to database (assuming you have a Booking model)
    const booking = await db.Booking.create(bookingDetails);

    // Find the user (assuming you have a User model)
    const user = await db.User.findByPk(userId);

    // Send confirmation email
    const userEmail = user.email;
    sendEmail(userEmail, 'Booking Confirmation', 'Your booking has been confirmed. Thank you for choosing our service!');

    // Update user loyalty points (assuming you have a function for this)
    // updateUserLoyaltyPoints(userId, 10); // Award 10 points for example - Implement this function as needed

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming booking', error });
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

// Ensure the database is synchronized
db.sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
