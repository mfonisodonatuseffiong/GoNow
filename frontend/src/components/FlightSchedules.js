import React, { useState, useEffect } from 'react';

const FlightSchedules = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch flight schedule data (assuming API exists)
    fetch('/api/flight-schedules')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setFlights(data))
      .catch(error => {
        console.error('Error fetching flight schedules:', error);
        setError('Failed to fetch flight schedules');
      });
  }, []);

  return (
    <div 
      className="container mb-5 text-dark bg-secondary" 
      style={{ height: '100vh', overflow: 'auto', padding: '20px', borderRadius: '10px' }}
    >
      <h1>Flight Schedules</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table 
        className="table table-striped table-hover"
      >
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Time</th>
            <th>Seats Available</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.date}</td>
              <td>{flight.time}</td>
              <td>{flight.availableSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightSchedules;
