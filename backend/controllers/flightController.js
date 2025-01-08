// Import the flightAPI function for fetching flight data
const { fetchRealTimeFlights } = require('../routes/flightAPI'); // Correct path for flightAPI

// Controller to handle flight search requests
const searchFlights = async (req, res) => {
  // Extract query parameters from the request
  const { origin, destination, departureDate } = req.query;

  // Check if all necessary parameters are provided
  if (!origin || !destination || !departureDate) {
    return res.status(400).json({ error: 'Missing required parameters: origin, destination, and departureDate are required' });
  }

  try {
    // Call the function to fetch flight data
    const flights = await fetchRealTimeFlights(origin, destination, departureDate);

    // If no flights are found, send a 404 response
    if (!flights || flights.length === 0) {
      return res.status(404).json({ message: 'No flights found for the given parameters' });
    }

    // Respond with the fetched flight data
    res.status(200).json(flights);
  } catch (error) {
    // Handle errors gracefully and send a meaningful response
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
};

// Export the searchFlights controller
module.exports = { searchFlights };
