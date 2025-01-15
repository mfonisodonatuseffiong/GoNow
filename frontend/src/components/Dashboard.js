import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS for styling

function Dashboard() {
  const [userData, setUserData] = useState(null); // State to store user details
  const [bookings, setBookings] = useState([]); // State to store user bookings
  const [loading, setLoading] = useState(true); // State for loading status
  const [feedback, setFeedback] = useState(''); // State for feedback
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.log('No token found, redirecting to login');
        setLoading(false);
        navigate('/login'); // Redirect to login if no token is found
        return;
      }

      try {
        console.log('Fetching user data...');
        const response = await axios.get('http://localhost:5000/api/users/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        console.log('User data fetched successfully:', response.data);
        setUserData(response.data.user); // Save user data to state
        setBookings(response.data.bookings || []); // Save user bookings to state

        // Log user data to confirm it's correct
        console.log('Fetched User Data:', response.data.user);
        console.log('Fetched Bookings Data:', response.data.bookings);
      } catch (err) {
        console.error('Error occurred while fetching data:', err);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/feedback', { feedback }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Thank you for your feedback!');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  if (loading) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-card-body">
          <h2 className="dashboard-title blinking">Welcome to your Dashboard</h2>

          {/* Display user information */}
          <p className="dashboard-text">
            <strong>Email:</strong> {userData?.username || userData?.email || 'N/A'}
          </p>

          {/* Display loyalty points */}
          <p className="dashboard-text">
            <strong>Loyalty Points:</strong> {userData?.loyaltyPoints || 0}
          </p>

          {/* Display booking history */}
          <div className="booking-history">
            <h3>Your Booking History</h3>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map((booking, index) => (
                  <li key={index}>
                    <p>Flight: {booking.flightNumber}</p>
                    <p>From: {booking.origin} to {booking.destination}</p>
                    <p>Date: {booking.date}</p>
                    <p>Status: {booking.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings found.</p>
            )}
          </div>

          <form onSubmit={handleFeedbackSubmit}>
            <h3>Leave Your Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here"
              rows="4"
              style={{ width: '100%', padding: '10px' }}
            ></textarea>
            <button type="submit" className="dashboard-logout-btn">Submit Feedback</button>
          </form>

          <button onClick={handleLogout} className="dashboard-logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
