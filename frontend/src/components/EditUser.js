import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure you have axios installed

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user details by ID
    axios
      .get(`/api/users/${id}`)  // Replace with your actual API endpoint
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching user data');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send updated data to the server
    axios
      .put(`/api/users/${id}`, user)  // Replace with your actual API endpoint
      .then(() => {
        navigate('/admin/users');  // Redirect to the user management page
      })
      .catch(err => {
        setError('Error updating user data');
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Edit User</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
