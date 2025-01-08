import React, { useState, useEffect } from 'react';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]); // State to hold ticket data
  const [error, setError] = useState(null); // State to hold errors
  const [loading, setLoading] = useState(true); // State to show loading indicator

  useEffect(() => {
    // Fetch ticket data from the backend
    fetch('/api/tickets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching ticket data:', error);
        setError('Failed to fetch ticket data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container bg-dark text-info p-4" style={{ height: '100vh' }}>
      <h1 className="mb-4">Ticket Management</h1>
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Ticket ID</th>
              <th>Passenger Name</th>
              <th>Flight Number</th>
              <th>Seat</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.passengerName}</td>
                <td>{ticket.flightNumber}</td>
                <td>{ticket.seat}</td>
                <td>{ticket.status}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">View</button>
                  <button className="btn btn-danger btn-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketManagement;
