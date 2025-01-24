import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import CSS for styling

function Dashboard() {
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
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

        console.log('Response data:', response.data);

        setLoading(false); // Stop loading indicator
      } catch (err) {
        console.error('Error occurred while fetching data:', err);
        setLoading(false); // Stop loading indicator
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  if (loading) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-card-body">
          <h2 className="dashboard-title blinking">Welcome to GoNow</h2>
          <button onClick={handleLogout} className="dashboard-logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
