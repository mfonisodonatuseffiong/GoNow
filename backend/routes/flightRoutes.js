const express = require('express');
const { fetchRealTimeFlights } = require('./flightAPI');
const router = express.Router();

router.get('/search', async (req, res) => {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: 'Missing required parameters: origin, destination, or date' });
  }

  try {
    console.log(`Fetching flights for: origin=${origin}, destination=${destination}, date=${date}`);
    const flightOffers = await fetchRealTimeFlights(origin, destination, date);
    res.json(flightOffers);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ error: 'Failed to fetch flight offers' });
  }
});

module.exports = router;
