import React from 'react';
import { useLocation } from 'react-router-dom';

function BookingConfirmation() {
  const location = useLocation();
  const bookingDetails = location.state;

  return (
    <div className="container mt-5 text-dark">
      <h1 className="text-center text-info mb-4">Booking Confirmation</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Thank you for your booking, {bookingDetails.name}!</h5>
          <p className="card-text">
            Your booking details:
            <ul>
              <li>Flight ID: {bookingDetails.flightId}</li>
              <li>Email: {bookingDetails.email}</li>
              <li>Phone: {bookingDetails.phone}</li>
              <li>Seat Preference: {bookingDetails.seatPreference}</li>
              <li>Meal Preference: {bookingDetails.mealPreference}</li>
              <li>Class: {bookingDetails.flightClass}</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
