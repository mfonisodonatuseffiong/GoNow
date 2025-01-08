const express = require('express');
const router = express.Router();
const { Bookings } = require('../models');  // Adjust path as necessary

router.post('/bookings', async (req, res) => {
  const { userId, flightId, bookingDetails } = req.body;

  try {
    console.log('Received booking request:', req.body);

    const newBooking = await Bookings.create({
      user_id: userId,
      flight_id: flightId,
      booking_details: bookingDetails,
    });

    console.log('Booking stored successfully:', newBooking);
    res.json(newBooking);
  } catch (error) {
    console.error('Error booking flight:', error);
    res.status(500).json({ error: 'Error booking flight', details: error.message });
  }
});

module.exports = router;
