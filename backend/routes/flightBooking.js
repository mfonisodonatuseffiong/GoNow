const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Flight booking endpoint
router.post('/bookings', async (req, res) => {
  const { flightId, userId, passengerDetails } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM flight_search_results WHERE flight_id = $1 AND user_id = $2 AND expires_at > NOW()',
      [flightId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Flight details not found or expired.' });
    }

    const flight = result.rows[0];
    // Simulate booking confirmation (replace with API call)
    const bookingConfirmation = {
      bookingId: `BOOK-${Date.now()}`,
      status: 'CONFIRMED',
    };

    await pool.query(
      'INSERT INTO bookings (booking_id, user_id, flight_id, booking_status, created_at) VALUES ($1, $2, $3, $4, NOW())',
      [bookingConfirmation.bookingId, userId, flightId, bookingConfirmation.status]
    );

    res.status(200).json({
      message: 'Booking successful!',
      data: bookingConfirmation,
    });
  } catch (error) {
    console.error('Error booking flight:', error.message);
    res.status(500).json({ error: 'Error booking flight.' });
  }
});

module.exports = router;
