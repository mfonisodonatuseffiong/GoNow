// src/pages/Checkout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    // Perform validation or data submission
    navigate('/payment');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-info">Proceed to Checkout</h2>
      <div className="card mt-4 p-3">
        <h5>Flight Details</h5>
        <p><strong>Flight:</strong> ABC123</p>
        <p><strong>Destination:</strong> New York</p>
        <p><strong>Price:</strong> ₦375,000</p>

        <h5 className="mt-3">Passenger Information</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="passengerName" className="form-label">Name</label>
            <input type="text" className="form-control" id="passengerName" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
