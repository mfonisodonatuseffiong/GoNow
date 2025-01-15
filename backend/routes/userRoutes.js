const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../models/User');
const Booking = require('../models/Booking');

// Dashboard endpoint
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId; // User ID from the token
    const user = await User.findById(userId);
    const bookings = await Booking.find({ userId: userId });

    res.json({ user, bookings });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
