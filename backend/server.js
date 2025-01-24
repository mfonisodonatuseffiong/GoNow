const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models');
const authenticateToken = require('./middleware/authenticateToken'); // Import the authentication middleware
const sendEmail = require('./services/sendEmail'); // Corrected path to sendEmail.js

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));
app.use('/api/admin/settings', require('./routes/settingsRoutes'));
app.use('/api/flights-api', require('./routes/flightAPI').router);
app.use('/api/contact', require('./routes/contactRoutes'));

// Send email route
app.post('/api/send-email', authenticateToken, async (req, res) => {
  const { recipient, subject, body } = req.body;
  try {
    await sendEmail(recipient, subject, body);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

// Booking confirmation route with authentication
app.post('/api/bookings/confirm', authenticateToken, async (req, res) => {
  const { bookingDetails } = req.body;
  const userId = req.userId;

  console.log('Received booking details:', bookingDetails);
  console.log('User ID:', userId);

  try {
    const booking = await db.Booking.create({
      ...bookingDetails,
      userId: userId,
      flightId: parseInt(bookingDetails.flightid) // Ensure flightId is an integer
    });
    console.log('Booking created:', booking);
    res.status(201).json({ message: 'Booking created', booking });

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingDetails.email,
      subject: 'Booking Confirmation',
      text: `Dear ${bookingDetails.fullname}, your booking for flight ${bookingDetails.flightNumber} has been confirmed.`
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent');
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error });
  }
});

// Process payment route
app.post('/api/process-payment', authenticateToken, async (req, res) => {
  const { paymentDetails, bookingDetails } = req.body;

  console.log('Payment Details:', paymentDetails);
  console.log('Booking Details:', bookingDetails);

  // Manually ensure all fields have values
  const details = {
    fullname: bookingDetails.fullname || 'Full Name Missing',
    email: bookingDetails.email || 'Email Missing',
    phonenumber: bookingDetails.phonenumber || 'Phone Number Missing',
    passportnumber: bookingDetails.passportnumber || 'Passport Number Missing',
    dateofbirth: bookingDetails.dateofbirth || 'Date of Birth Missing',
    seatpreference: bookingDetails.seatpreference || 'Seat Preference Missing',
    mealpreference: bookingDetails.mealpreference || 'Meal Preference Missing',
    class: bookingDetails.class || 'Class Missing',
    flightNumber: bookingDetails.flightNumber || 'Flight Number Missing'
  };

  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay

    // Send confirmation email
    await sendEmail(
      details.email,
      'Booking Confirmation',
      `Dear ${details.fullname},

Your booking for the flight from ${details.flightNumber} has been successfully secured.

Details:
- Full Name: ${details.fullname}
- Email: ${details.email}
- Phone Number: ${details.phonenumber}
- Passport Number: ${details.passportnumber}
- Date of Birth: ${details.dateofbirth}
- Seat Preference: ${details.seatpreference}
- Meal Preference: ${details.mealpreference}
- Class: ${details.class}

Thank you for booking with us. GoNow loves you!`
    );

    res.status(200).json({ message: 'Payment processed and confirmation email sent!' });
  } catch (error) {
    console.error('Error processing payment or sending email:', error);
    res.status(500).json({ message: 'An error occurred while processing the payment.' });
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
