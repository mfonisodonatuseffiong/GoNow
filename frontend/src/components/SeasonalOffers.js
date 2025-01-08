import React from 'react';

const SeasonalOffers = () => {
  const handleShowNowClick = () => {
    // Implement your "Show Now" action here, e.g., open a modal or navigate
    console.log('Show Now clicked');
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Seasonal Offers</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <img src="offer1.jpg" className="card-img-top" alt="Offer 1" />
            <div className="card-body">
              <h5 className="card-title">Winter Sale</h5>
              <p className="card-text">Get up to 50% off on winter essentials.</p>
              <button className="btn btn-primary" onClick={handleShowNowClick}>Show Now</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src="offer2.jpg" className="card-img-top" alt="Offer 2" />
            <div className="card-body">
              <h5 className="card-title">Spring Collection</h5>
              <p className="card-text">New arrivals for spring, up to 30% off.</p>
              <button className="btn btn-primary" onClick={handleShowNowClick}>Show Now</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img src="offer3.jpg" className="card-img-top" alt="Offer 3" />
            <div className="card-body">
              <h5 className="card-title">Summer Clearance</h5>
              <p className="card-text">End-of-season sale on summer products.</p>
              <button className="btn btn-primary" onClick={handleShowNowClick}>Show Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalOffers;
