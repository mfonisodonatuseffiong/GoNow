import React from 'react';
import { useNavigate } from 'react-router-dom';

function ShopNow() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div
        className="container-fluid text-white p-5"
        style={{
          backgroundImage: "url('/images/shophero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '30vh',
        }}
      >
        <div className="row align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
          <div className="col-md-8 text-center">
            <div
              className="card text-white shadow-lg"
              style={{
                backgroundColor: '#BFDFBC',
                opacity: 0.8,
              }}
            >
              <div className="card-body p-5">
                <h1 className="card-title mb-4 display-4">Exclusive Limited-Time Offers</h1>
                <p className="card-text lead mb-4">
                  Don’t miss out on our exclusive, limited-time offers. Shop now and enjoy fantastic discounts on flights, vacation packages, and more!
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-warning btn-lg" onClick={() => navigate('/explore')}>
                    Explore More Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Now Section */}
      <div className="container py-4">
        <h2 className="text-center text-primary mb-5">Browse Our Featured Offers</h2>
        <div className="row">
          {[{
            imgSrc: '/images/offer1.jpg',
            title: 'Summer Vacation Deals',
            description: 'Book your summer vacation now and save big on select destinations!',
          }, {
            imgSrc: '/images/offer2.jpg',
            title: 'Flight Discounts',
            description: 'Exclusive flight discounts for a limited time only! Grab them before they’re gone!',
          }, {
            imgSrc: '/images/offer3.jpg',
            title: 'Weekend Getaways',
            description: 'Escape for the weekend with our best deals on short-haul flights and hotels.',
          }].map((offer, index) => (
            <div className="col-md-4 mb-5" key={index}>
              <div className="card" style={{ height: '350px' }}>
                <img
                  src={offer.imgSrc}
                  className="card-img-top"
                  alt={offer.title}
                  style={{ maxHeight: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{offer.title}</h5>
                  <p className="card-text">{offer.description}</p>
                  <button className="btn btn-warning">Shop Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container py-5 text-center">
        <h2 className="text-primary">Don't Wait – Shop Now!</h2>
        <p className="lead mb-4">
          Take advantage of our limited-time offers and book your next adventure today. Don’t miss out!
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/book-now')}>
          Book Your Flight
        </button>
      </div>
    </div>
  );
}

export default ShopNow;
