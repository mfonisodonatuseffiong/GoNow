// /config/config.js
require('dotenv').config();

module.exports = {
  amadeus: {
    apiKey: process.env.AMADEUS_API_KEY,
    apiSecret: process.env.AMADEUS_API_SECRET,
    baseUrl: 'https://test.api.amadeus.com/v1',
  },
};
