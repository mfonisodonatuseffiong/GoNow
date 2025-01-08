const express = require('express');
const axios = require('axios');
const router = express.Router();

const AMADEUS_BASE_URL = process.env.AMADEUS_BASE_URL || 'https://test.api.amadeus.com';

// Function to fetch Amadeus access token
const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post(
      `${AMADEUS_BASE_URL}/v1/security/oauth2/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Amadeus access token:', error.response?.data || error.message);
    throw new Error('Unable to fetch Amadeus access token');
  }
};

// POST route for searching flights
router.post('/search-flights', async (req, res) => {
  const { origin, destination, date, adults = 1 } = req.body;

  // Validate the parameters
  const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!origin || !destination || !date || !isValidDate(date)) {
    return res.status(400).json({
      error: 'Missing or invalid parameters: origin, destination, and date (YYYY-MM-DD format required)',
    });
  }

  try {
    const accessToken = await getAmadeusAccessToken();
    const response = await axios.get(`${AMADEUS_BASE_URL}/v2/shopping/flight-offers`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults,
      },
    });
    res.json(response.data); // Send flight offers as response
  } catch (error) {
    console.error('Error searching flights:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to search for flights' });
  }
});

module.exports = router;
