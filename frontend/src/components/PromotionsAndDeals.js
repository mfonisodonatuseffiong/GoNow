// src/components/PromotionsAndDeals.js
import React from 'react';

const PromotionsAndDeals = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Promotions & Deals</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <img src="promotion1.jpg" className="card-img-top" alt="Promotion 1" />
            <div className="card-body">
              <h5 className="card-title">Early Bird Special</h5>
              <p className="card-text">Exclusive early bird discounts for the first 100 bookings.</p>
              <button className="btn btn-primary">Show Now</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src="promotion2.jpg" className="card-img-top" alt="Promotion 2" />
            <div className="card-body">
              <h5 className="card-title">Weekend Getaways</h5>
              <p className="card-text">Book now for special weekend getaway rates.</p>
              <button className="btn btn-primary">Show Now</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src="promotion3.jpg" className="card-img-top" alt="Promotion 3" />
            <div className="card-body">
              <h5 className="card-title">Flash Sale</h5>
              <p className="card-text">Limited-time flash sale with 50% off on select flights.</p>
              <button className="btn btn-primary">Show Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsAndDeals;
