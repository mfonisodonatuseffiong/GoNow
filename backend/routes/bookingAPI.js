const express = require('express');
const router = express.Router();

router.post('/bookings', (req, res) => {
  const {
    name,
    email,
    phone,
    passport,
    dateOfBirth,
    seatPreference,
    mealPreference,
    flightClass,
    flightId,
  } = req.body;

  // Add logic to save the booking details to your database here
  // For demonstration, we'll just return a success message
  res.json({ message: 'Booking Successful!' });
});

module.exports = router;
