// /backend/config/amadeusClient.js
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: 'V8ihM6ZnbsC4czlL0P9CSIi0592W1TLq', // your client ID
  clientSecret: 'Ld3GTlA237BhEdf6' // your client secret
});

module.exports = amadeus;
