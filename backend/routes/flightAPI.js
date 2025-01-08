const express = require('express');
const axios = require('axios');
const router = express.Router();

let accessToken = '';
let tokenExpiry = 0;

// Function to generate a new access token
const generateAccessToken = async () => {
  try {
    console.log('Generating access token...');
    console.log('Amadeus API Key:', process.env.AMADEUS_API_KEY);
    console.log('Amadeus API Secret:', process.env.AMADEUS_API_SECRET);

    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;  // Token expiry time in milliseconds
    console.log('New access token generated:', accessToken);
  } catch (error) {
    console.error('Error generating access token:', error.response?.data);
    throw new Error('Error generating access token: ' + error.message);
  }
};

// Middleware to ensure the access token is valid
const ensureAccessToken = async (req, res, next) => {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await generateAccessToken();
  }
  next();
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
