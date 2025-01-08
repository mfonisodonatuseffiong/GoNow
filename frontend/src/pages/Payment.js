import React, { useState } from 'react';

function Payment() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPaymentStatus('success');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: '300px', margin: '0 auto' }}
    >
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
            Thank you for booking with <strong>GoNow</strong>. Payment successful!
          </h3>
        </div>
      ) : (
        <div className="card mt-4 p-3 mx-auto" style={{ maxWidth: '400px' }}>
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
                className="btn btn-success"
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
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Payment;
