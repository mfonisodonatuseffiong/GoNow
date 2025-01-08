// routes/goNowRoutes.js

const express = require('express');
const router = express.Router();
const { Flight } = require('../models/FlightModel');  // Adjust the path based on your model

// Route to search for flights
router.get('/search', async (req, res) => {
  const { departure, destination, date } = req.query;

  // Check if all required parameters are present
  if (!departure || !destination || !date) {
    return res.status(400).json({
      message: 'Missing required parameters: departure, destination, or date.',
    });
  }

  try {
    // Find flights based on query parameters
    const flights = await Flight.findAll({
      where: {
        origin: departure,           // Ensure your model's field name is correct
        destination: destination,     // Ensure your model's field name is correct
        departureDate: date,         // Ensure your model's field name is correct
      },
    });

    // Return a 404 if no flights are found
    if (flights.length === 0) {
      return res.status(404).json({ message: 'No flights found' });
    }

    // Respond with the found flights
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router to use it in server.js
module.exports = router;
