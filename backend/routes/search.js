const express = require('express');
const router = express.Router();
const FlightSearchResults = require('../models/flightSearchResults'); // Adjust path as necessary

router.post('/search', async (req, res) => {
  const { userId, searchResults } = req.body;
  const searchTimestamp = new Date();

  // Limit the number of flight results to 2
  const limitedSearchResults = {
    ...searchResults,
    data: searchResults.data.slice(0, 2)
  };

  console.log('Received search request:', { userId, limitedSearchResults });

  try {
    const result = await FlightSearchResults.create({
      user_id: userId,
      search_timestamp: searchTimestamp,
      flight_data: limitedSearchResults,
    });
    console.log('Stored search result:', result);
    res.json(result);
  } catch (error) {
    console.error('Error storing search results:', error);
    res.status(500).json({ error: 'Failed to store search results' });
  }
});

module.exports = router;
