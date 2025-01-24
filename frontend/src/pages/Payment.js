import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css'; // Import the updated CSS file

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Log bookingDetails for debugging
  console.log('bookingDetails:', bookingDetails);

  // Fallback for missing data
  if (!bookingDetails) {
    console.error('Data is missing:', { bookingDetails });
    return <p>Data is missing. Please go back and ensure all steps are completed correctly.</p>;
  }

  const handlePayment = async () => {
    setIsLoading(true);
    setError('');
    setResponseMessage('');

    try {
      // Simulate payment process here
      const paymentDetails = {
        cardNumber: '1234 5678 9012 3456', // Replace with actual payment details from the form
        expiryDate: '12/23',
        cvv: '123',
        postalCode: '12345'
      };

      const response = await axios.post('http://localhost:5000/api/process-payment', {
        paymentDetails,
        bookingDetails
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM3NzEzMjg4LCJleHAiOjE3Mzc3MTY4ODh9.fNav_enKmZLnLkKz3geBcW1T1aNgVr3pOpBpIHZLJD0` // New JWT token
        }
      });

      console.log(response); // Log the response to use the response variable
      setPaymentStatus('success');
      setResponseMessage('Payment processed and confirmation email sent!');
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('Other Error:', error.message);
      }
      setError('There was an error processing your payment. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/flight-search'); // Redirect to flight search page on cancel
  };

  return (
    <div className="container mt-5 payment-page" style={{ maxWidth: '300px', margin: '0 auto' }}>
      <div className="card mt-4 p-3 mx-auto" style={{ maxWidth: '400px' }}>
        {paymentStatus === 'success' ? (
          <div className="text-center">
            <img
              src="./images/successful.png"
              alt="Payment Successful"
              style={{
                width: '150px',
                transition: 'transform 0.3s ease-in-out',
              }}
              className="success-tick"
            />
            <h3 className="text-success mt-3">
            Thank you for booking with <strong>GoNow</strong>. Payment successful! and confirmation email sent!
            </h3>
          </div>
        ) : (
          <>
            <h5>Payment Details</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  placeholder="MM/YY"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  id="cvv"
                  placeholder="123"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">Zip/Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  placeholder="12345"
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-success pay-button"
                  onClick={handlePayment}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner-border spinner-border-sm text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    'Pay Now'
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-danger cancel-button"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
              {responseMessage && <div className="mt-3 text-center text-success">{responseMessage}</div>}
              {error && <div className="mt-3 text-center text-danger">{error}</div>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
