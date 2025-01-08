import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Call the onLogin function to set the user data
      onLogin(response.data.username, response.data.email);

      // Set login success message
      setLoginSuccess('Login successful! Redirecting to dashboard...');

      // Redirect to the dashboard after a short delay to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // 2-second delay to allow the success message to show
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message); // Display error message from backend
      } else if (error.request) {
        setErrorMessage('No response from server');
      } else {
        setErrorMessage('Error occurred: ' + error.message);
      }
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="card mt-5 p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>

      {loginSuccess && <p style={{ color: 'green' }}>{loginSuccess}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-warning w-100">Login</button>
      </form>

      <div className="text-center mt-3">
        <button 
          type="button" 
          className="btn btn-link" 
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default Login;
