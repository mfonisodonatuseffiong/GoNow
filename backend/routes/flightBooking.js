const express = require('express');
const axios = require('axios');
const router = express.Router();

let accessToken = '';
let tokenExpiry = 0;

// Function to generate a new access token
const generateAccessToken = async () => {
  // Generate access token logic
};

// Middleware to ensure the access token is valid
const ensureAccessToken = async (req, res, next) => {
  // Ensure access token logic
};

// Flight search route
router.get('/real-time-flights', ensureAccessToken, async (req, res) => {
  const { origin, destination, departureDate } = req.query;
  console.log('Flight search request:', { origin, destination, departureDate });

  try {
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults: 1,
        currencyCode: 'USD',
      },
    });

    console.log('Flight search response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error.response?.data);
    res.status(500).json({ error: 'Error fetching flight data: ' + (error.response?.data.detail || error.message) });
  }
});

module.exports = { generateAccessToken, ensureAccessToken, router };
