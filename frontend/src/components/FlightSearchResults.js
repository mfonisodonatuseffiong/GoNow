import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlightSearchResults = ({ flights }) => {
  const navigate = useNavigate();

  const handleBookNow = (flight) => {
    // Pass flight data to the BookingForm page
    navigate('/booking-form', { state: { flight } });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'red', animation: 'moveInOut 3s infinite' }}>Flight Search Results</h2>
      <ul style={{ color: 'black', listStyleType: 'none', padding: 0, textAlign: 'center' }}>
        {Array.isArray(flights) && flights.length > 0 ? flights.map((flight, index) => (
          <li key={index} style={{ marginBottom: '20px', textAlign: 'center', border: '2px solid #ddd', padding: '10px', borderRadius: '8px', display: 'inline-block', width: '80%' }}>
            <p>Flight ID: {flight.id}</p>
            <p>Last Ticketing Date: {flight.lastTicketingDate}</p>
            <p>Seats Available: {flight.numberOfBookableSeats}</p>
            <p>Price: {flight.price} {flight.currency}</p>
            <p>Carrier: {flight.carrier}</p>
            <p>Departure: {flight.departure?.at ? flight.departure.at : 'N/A'}</p>
            <p>Arrival: {flight.arrival?.at ? flight.arrival.at : 'N/A'}</p>
            <button
              onClick={() => handleBookNow(flight)}
              style={{
                display: 'block',
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Book Now
            </button>
          </li>
        )) : <p style={{ color: 'black' }}>No flights found.</p>}
      </ul>
      <style jsx>{`
        @keyframes moveInOut {
          0%, 100% { opacity: 0; transform: translateX(100%); }
          50% { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default FlightSearchResults;
