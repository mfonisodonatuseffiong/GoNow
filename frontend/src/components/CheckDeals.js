import React from 'react';

function CheckDeals() {
  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-5">Check Flight Deals</h2>

      {/* Deal Section */}
      <div className="row">
        {[{
          imgSrc: '/images/first.jpg',
          title: 'Exclusive Flight Deals',
          text: 'Get exclusive offers with up to 40% off on selected routes!',
        }, {
          imgSrc: '/images/second.jpg',
          title: 'Weekend Specials',
          text: 'Special weekend offers for spontaneous getaways.',
        }, {
          imgSrc: '/images/third.jpg',
          title: 'Early Bird Offers',
          text: 'Book early and save more on flights!',
        }].map((deal, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={deal.imgSrc}
                className="card-img-top"
                alt={deal.title}
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{deal.title}</h5>
                <p className="card-text">{deal.text}</p>
                <button className="btn btn-warning">Grab Deal</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Information Section */}
      <div className="mt-5">
        <h3 className="text-danger">Terms & Conditions</h3>
        <ul className="text-danger">
          <li>All discounts are subject to availability and may change without prior notice.</li>
          <li>Offers are valid only for specific destinations and travel dates.</li>
          <li>Bookings must be made exclusively through the GoNow platform to qualify for these offers.</li>
        </ul>
      </div>
    </div>
  );
}

export default CheckDeals;
