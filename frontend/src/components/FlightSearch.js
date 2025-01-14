import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FlightSearchResults from './FlightSearchResults';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: ''
  });
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleLocationSearch = async (keyword, fieldName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/flights-api/locations`, {
        params: { keyword },
      });
      const data = response.data;

      // If a user selects a location, update the searchParams
      if (data.length > 0 && fieldName) {
        setSearchParams((prevParams) => ({
          ...prevParams,
          [fieldName]: data[0].iataCode, // Select the IATA code of the first matching location
        }));
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
      setError('Missing required parameters: origin, destination, or date');
      return;
    }

    try {
      setError('');
      setLoading(true);
      console.log('Flight search parameters:', searchParams);
      const response = await axios.get('http://localhost:5000/api/flights-api/real-time-flights', {
        params: searchParams,
      });
      console.log('API Response:', response.data);

      if (response.data?.data?.length > 0) {
        const extractedFlights = response.data.data.map((flight) => ({
          id: flight.id,
          lastTicketingDate: flight.lastTicketingDate,
          numberOfBookableSeats: flight.numberOfBookableSeats,
          price: flight.price?.total,
          currency: response.data.dictionaries?.currencies?.USD,
          carrier: response.data.dictionaries?.carriers[flight.validatingAirlineCodes?.[0]],
          itineraries: flight.itineraries,
        }));

        console.log('Extracted Flights:', extractedFlights);
        setFlights(extractedFlights);
      } else {
        setFlights([]);
        setError('No flights found for the given parameters.');
      }
    } catch (error) {
      console.error('Error during flight search:', error);
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (flight) => {
    navigate('/booking-form', { state: { flight } });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f7f7f7' }}>
      <h1 style={{ color: '#17a2b8', fontFamily: 'Arial, sans-serif' }}>Flight Search</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: '0 auto',
          maxWidth: '500px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#333', fontWeight: 'bold' }}>Origin:</label>
          <input
            type="text"
            name="origin"
            value={searchParams.origin}
            onChange={handleInputChange}
            onBlur={(e) => handleLocationSearch(e.target.value, 'origin')}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#333', fontWeight: 'bold' }}>Destination:</label>
          <input
            type="text"
            name="destination"
            value={searchParams.destination}
            onChange={handleInputChange}
            onBlur={(e) => handleLocationSearch(e.target.value, 'destination')}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', color: '#333', fontWeight: 'bold' }}>Departure Date:</label>
          <input
            type="date"
            name="departureDate"
            value={searchParams.departureDate}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>Error: {error}</p>}

      <FlightSearchResults flights={flights} handleBookNow={handleBookNow} />
    </div>
  );
};

export default FlightSearch;
