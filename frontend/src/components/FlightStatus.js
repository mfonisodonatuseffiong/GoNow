import React, { useState } from 'react';
import './FlightStatus.css'; // Import the CSS file

const FlightStatus = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFlightNumberChange = (e) => {
    setFlightNumber(e.target.value);
  };

  const checkFlightStatus = async () => {
    if (!flightNumber) {
      alert('Please enter a flight number');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Replace this with your actual backend API endpoint
      const response = await fetch(`/api/flight-status/${flightNumber}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch flight status');
      }

      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      setError('Failed to fetch flight status');
      console.error('Error fetching flight status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 flight-status-page text-center"> {/* Apply the class here */}
      <h2>Check Flight Status</h2>
      
      <div className="mb-3">
        <label htmlFor="flightNumber" className="form-label">Enter Flight Number</label>
        <input
          type="text"
          className="form-control"
          id="flightNumber"
          value={flightNumber}
          onChange={handleFlightNumberChange}
          placeholder="Enter Flight Number (e.g., AF123)"
        />
      </div>

      <button className="btn btn-primary" onClick={checkFlightStatus} disabled={loading}>
        {loading ? 'Loading...' : 'Check Status'}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {status && !error && (
        <div className="alert alert-success mt-3">
          <strong>Flight Status:</strong> {status}
        </div>
      )}
    </div>
  );
};

export default FlightStatus;
