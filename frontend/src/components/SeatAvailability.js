import React, { useState, useEffect } from 'react';

const SeatAvailability = ({ flightId }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Fetch seat availability for the selected flight
    fetch(`/api/seat-availability/${flightId}`)
      .then(response => response.json())
      .then(data => setSeats(data))
      .catch(error => console.error('Error fetching seat availability:', error));
  }, [flightId]);

  return (
    <div className="container">
      <h1>Seat Availability</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Seat Number</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {seats.map(seat => (
            <tr key={seat.id}>
              <td>{seat.seatNumber}</td>
              <td>{seat.class}</td>
              <td>{seat.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeatAvailability;
