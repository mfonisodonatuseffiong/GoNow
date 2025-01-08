import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for visibility toggle

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State to toggle confirm password visibility
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      setSuccessMessage('');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setSuccessMessage('');
      return;
    }

    // Set loading state to true while sending request
    setLoading(true);
    setError(''); // Reset any previous errors

    try {
      // Send the sign-up request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
        confirmPassword,
      });

      // Handle successful response
      setSuccessMessage('Successfully signed up! Please go to the login page to log in.');
      setLoading(false);

      // Save the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Optionally, clear input fields after successful signup
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setLoading(false);
      console.error('Error during sign-up:', err.response || err.message);
      setError(err.response?.data?.message || 'Error during sign up. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="card mt-5 p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Signup</h2>
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
            <span className="input-group-text" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="input-group-text" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-warning w-100" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>

      {/* Success message below the form */}
      {successMessage && (
        <div className="alert alert-success mt-3">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default Signup;
