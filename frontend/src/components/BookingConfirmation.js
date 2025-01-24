import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookingConfirmation.css'; // Import the CSS file

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/payment', { state: { bookingDetails } });
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [navigate, bookingDetails]);

  return (
    <div className="container mt-5 text-center">
      <h2>Booking Confirmed</h2>
      <p>Your booking has been confirmed.</p>
      <p>You will be redirected to the payment page shortly.</p>
    </div>
  );
};

export default BookingConfirmation;
