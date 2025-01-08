// flightSearch.js or flightsController.js
const Flight = require('../models/goNowModel');  // Assuming you have a flight model for querying the DB

// Function to handle search request
const searchFlights = async (req, res) => {
  try {
    const { departure, destination, date } = req.query;  // Get search parameters from query string

    // Query flights based on search criteria
    const flights = await Flight.find({
      departure_city: departure,
      destination_city: destination,
      flight_date: date,
    });

    if (!flights) {
      return res.status(404).json({ message: 'No flights found for your search criteria' });
    }

    res.status(200).json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while searching for flights' });
  }
};

module.exports = { searchFlights };
