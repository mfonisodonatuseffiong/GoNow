const sendEmail = require('./sendEmail');
const Booking = require('../models/Booking'); // Import your Booking model
const User = require('../models/User'); // Import your User model

// Function to handle booking confirmation
const confirmBooking = async (req, res) => {
  const { userId, bookingDetails } = req.body;

  try {
    // Save booking details to database
    const booking = await Booking.create(bookingDetails);

    // Find the user
    const user = await User.findById(userId);

    // Send confirmation email
    const userEmail = user.email;
    sendEmail(userEmail, 'Booking Confirmation', 'Your booking has been confirmed. Thank you for choosing our service!');

    // Update user loyalty points
    updateUserLoyaltyPoints(userId, 10); // Award 10 points for example

    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming booking', error });
  }
};

module.exports = { confirmBooking };
