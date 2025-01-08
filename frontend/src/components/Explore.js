// src/components/Explore.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import FlightCard from './FlightCard';

const flights = [
  {
    title: 'Flight to New York',
    description: 'Enjoy the best prices on flights to New York City.',
    image: '/flight-to-new-york.jpg',
  },
  {
    title: 'Flight to London',
    description: 'Discover the charm of London at affordable prices.',
    image: '/flight-to-london.jpg',
  },
  {
    title: 'Flight to Paris',
    description: 'Explore the beauty of Paris with unbeatable fares.',
    image: '/flight-to-paris.jpg',
  },
];

function Explore() {
  const navigate = useNavigate(); // Hook to navigate to another page

  // Function to handle the navigation to the booking form page
  const handleBookNow = () => {
    navigate('/booking-form'); // Corrected path to your BookingForm component
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center text-primary">Explore Flights</h1>
      <div className="row mt-3">
        {flights.map((flight, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <FlightCard flight={flight} onBookNow={handleBookNow} /> {/* Pass handleBookNow as prop */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
