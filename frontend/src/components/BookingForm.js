import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookingForm.css'; // Import the updated CSS file

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    passportnumber: '',
    dateofbirth: '',
    seatpreference: 'Window',
    mealpreference: 'Vegetarian',
    class: 'Economy'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const flightDetails = location.state?.flight || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      navigate('/booking-confirmation', { state: { bookingDetails: { ...formData, ...flightDetails } } });
    }, 2000);
  };

  return (
    <div className="booking-form">
      <h2 className="dancing-text">Book Your Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Passport Number:</label>
          <input type="text" name="passportnumber" value={formData.passportnumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Seat Preference:</label>
          <select name="seatpreference" value={formData.seatpreference} onChange={handleChange}>
            <option value="Window">Window</option>
            <option value="Aisle">Aisle</option>
          </select>
        </div>
        <div className="form-group">
          <label>Meal Preference:</label>
          <select name="mealpreference" value={formData.mealpreference} onChange={handleChange}>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>
        <div className="form-group">
          <label>Class:</label>
          <select name="class" value={formData.class} onChange={handleChange}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
        <div className="form-group">
          <label>Flight Number:</label>
          <input type="text" name="flightNumber" value={flightDetails.id} readOnly />
        </div>
        <div className="form-group">
          <label>Departure Date:</label>
          <input type="date" name="departureDate" value={flightDetails.itineraries[0].segments[0].departure.at.split('T')[0]} readOnly />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
      {loading && <p style={{ color: 'red' }}>Booking is being processed...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BookingForm;
