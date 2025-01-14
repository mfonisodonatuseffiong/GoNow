import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingForm.css'; // You can use the same CSS file for styling

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flightDetails = location.state?.flightDetails || [];

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { flightDetails } });
  };

  return (
    <div className="booking-form">
      <h2 className="dancing-text">Booking Confirmation</h2>
      {flightDetails.length > 0 && (
        <div className="flight-details">
          <h3>Flight Details</h3>
          <p>Price: {flightDetails[0].flightOffers[0].price.total} {flightDetails[0].flightOffers[0].price.currency}</p>
          {/* Add more flight details as needed */}
        </div>
      )}
      <button onClick={handleProceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default BookingConfirmation;
