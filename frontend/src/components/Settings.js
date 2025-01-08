import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Add error state
  const navigate = useNavigate();  // For redirecting with useNavigate

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // If there's no token, redirect to login
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/admin/settings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSettings(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);  // Stop loading on error
        if (err.response && err.response.status === 401) {
          setError('Unauthorized: You must be an admin to view the settings.');
          navigate('/login');  // Redirect to login if unauthorized
        } else {
          setError('Failed to fetch settings. Please try again later.');
        }
        console.error(err);
      }
    };
    fetchSettings();
  }, [navigate]);  // Dependency array includes navigate to ensure useNavigate works properly

  const updateSetting = async (key, value) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      await axios.put(
        `/api/admin/settings/${key}`,
        { value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Setting updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update setting');
    }
  };

  if (loading) return <p>Loading settings, please wait...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'black' }}>Admin Settings</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if there is one */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {settings.map(setting => (
          <li
            key={setting.key}
            style={{
              background: '#fff',
              marginBottom: '10px',
              padding: '15px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong style={{ color: 'black' }}>{setting.key}:</strong> <span style={{ color: 'black' }}>{setting.value}</span>
            <button
              onClick={() =>
                updateSetting(setting.key, prompt('New value:', setting.value))
              }
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Settings;
