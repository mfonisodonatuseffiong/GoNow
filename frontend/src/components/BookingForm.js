import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css'; // Import the CSS file

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    passportNumber: '',
    dateOfBirth: '',
    seatPreference: 'Window',
    mealPreference: 'Vegetarian',
    class: 'Economy'
  });

  const [flightDetails, setFlightDetails] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getNewAccessToken = async () => {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', process.env.REACT_APP_AMADEUS_API_KEY);
      params.append('client_secret', process.env.REACT_APP_AMADEUS_API_SECRET);

      const authResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const accessToken = authResponse.data.access_token;
      const expiresIn = authResponse.data.expires_in;
      const expirationTime = Date.now() + expiresIn * 1000;

      localStorage.setItem('amadeus_access_token', accessToken);
      localStorage.setItem('amadeus_token_expiration', expirationTime);

      return accessToken;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw new Error('Failed to obtain access token');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let accessToken = localStorage.getItem('amadeus_access_token');
      const expirationTime = localStorage.getItem('amadeus_token_expiration');

      if (!accessToken || Date.now() >= expirationTime) {
        accessToken = await getNewAccessToken();
      }

      console.log('Access Token:', accessToken);

      const searchResponse = await axios.post('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        originDestinations: [
          {
            id: '1',
            originLocationCode: 'ATH',
            destinationLocationCode: 'JFK',
            departureDateTimeRange: { date: '2025-12-15' }
          }
        ],
        travelers: [{ id: '1', travelerType: 'ADULT' }],
        sources: ['GDS'],
        searchCriteria: {
          maxFlightOffers: 1,
          flightFilters: {
            cabinRestrictions: [
              {
                cabin: 'ECONOMY',
                coverage: 'MOST_SEGMENTS',
                originDestinationIds: ['1']
              }
            ]
          }
        }
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Search Response:', searchResponse.data);

      const flightOffer = searchResponse.data.data[0];

      const pricingResponse = await axios.post('https://test.api.amadeus.com/v1/shopping/flight-offers/pricing', {
        data: {
          type: 'flight-offers-pricing',
          flightOffers: [flightOffer]
        }
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Pricing Response:', pricingResponse.data);

      setFlightDetails(pricingResponse.data.data);
      setConfirmationMessage('Booking confirmed! Proceeding to payment...');
      console.log('Flight booking successful:', pricingResponse.data);

      // Redirect to BookingConfirmation page
      navigate('/booking-confirmation', { state: { flightDetails: pricingResponse.data.data } });

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      setConfirmationMessage('There was an error processing your booking. Please try again.');
    }
  };

  return (
    <div className="booking-form">
      <h2 className="dancing-text">Book Your Flight</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Passport Number:</label>
          <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Seat Preference:</label>
          <select name="seatPreference" value={formData.seatPreference} onChange={handleChange}>
            <option value="Window">Window</option>
            <option value="Aisle">Aisle</option>
          </select>
        </div>
        <div>
          <label>Meal Preference:</label>
          <select name="mealPreference" value={formData.mealPreference} onChange={handleChange}>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>
        <div>
          <label>Class:</label>
          <select name="class" value={formData.class} onChange={handleChange}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
        <button type="submit">Confirm Booking</button>
      </form>
      {flightDetails && (
        <div className="flight-details">
          <h3>Flight Details</h3>
          <p>Price: {flightDetails.flightOffers[0].price.total} {flightDetails.flightOffers[0].price.currency}</p>
          {/* Add more flight details as needed */}
        </div>
      )}
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
};

export default BookingForm;
