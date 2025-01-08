import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // State for the typing effect
  const [welcomeText, setWelcomeText] = useState('');
  const fullText = 'Welcome to GoNow';

  // Form state
  const [departureAirport, setDepartureAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setWelcomeText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(typingInterval);
      }
    }, 150);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate('/flight-search', {
      state: { departureAirport, destinationAirport, departureDate }
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="container-fluid text-white p-5"
        style={{ 
          backgroundImage: "url('/images/plane.gif')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '30vh' 
        }}
      >
        <div className="row align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
          <div className="col-md-8 text-center">
            <div className="card text-white shadow-lg" style={{ backgroundColor: '#BFDFBC', opacity: 0.8 }}>
              <div className="card-body p-5">
                <img
                  src="/images/deal.jpg"
                  className="img-fluid mb-1"
                  alt="GoNow Hero"
                  style={{ maxHeight: '100px', objectFit: 'cover', width: '30%', borderRadius: '5px' }}
                />
                <h1 className="card-title mb-4 display-4">{welcomeText}</h1>
                <p className="card-text lead mb-4">Discover the best flights at unbeatable prices. Your journey begins here!</p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-warning btn-lg" onClick={() => navigate('/explore')}>Explore Flights</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions and Deals Section */}
      <div className="container py-4 mt-5">
        <h2 className="text-center text-primary mb-5">Promotions and Deals</h2>
        <div className="row">
          {[
            {
              imgSrc: '/images/topdeal.jpg',
              title: 'Top Deals of the Day',
              text: 'Discover the best deals of the day with up to 50% off!',
              buttonText: 'Check Deals',
            },
            {
              imgSrc: '/images/seasonaloffer.jpg',
              title: 'Seasonal Offers',
              text: 'Take advantage of our Summer Sale with amazing flight discounts!',
              buttonText: 'View Seasonal Offers',
            },
            {
              imgSrc: '/images/flashsale.jpg',
              title: 'Limited-Time Offers',
              text: 'Hurry, these deals won’t last long. Shop now!',
              buttonText: 'Shop Now',
            },
          ].map((deal, index) => (
            <div className="col-md-4 mb-5" key={index}>
              <div className="card" style={{ height: '350px' }}>
                <img
                  src={deal.imgSrc}
                  className="card-img-top"
                  alt={deal.title}
                  style={{ maxHeight: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{deal.title}</h5>
                  <p className="card-text">{deal.text}</p>
                  <button className="btn btn-warning" onClick={() => navigate('/check-deals')}>{deal.buttonText}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-4">
        <h2 className="text-center text-primary mb-3">Why Choose Us?</h2>
        <div className="row">
          {[
            {
              imgSrc: '/images/priceguarantee.png',
              title: 'Best Price Guarantee',
              text: 'We guarantee the best prices for flights worldwide. Book with confidence!',
            },
            {
              imgSrc: '/images/customersupport.jpeg',
              title: '24/7 Customer Support',
              text: 'Our team is available around the clock to assist you with any travel concerns.',
            },
            {
              imgSrc: '/images/cancellation.gif',
              title: 'Easy Cancellations',
              text: 'Enjoy hassle-free cancellations and flexibility when you book with us.',
            },
          ].map((feature, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card text-center" style={{ height: '350px' }}>
                <div className="card-body">
                  <img
                    src={feature.imgSrc}
                    className="card-img-top"
                    alt={feature.title}
                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                  />
                  <h5 className="card-title mt-3">{feature.title}</h5>
                  <p className="card-text">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flight Booking Form Section */}
      <div className="container py-3">
        <h2 className="text-center text-primary mb-4">Book Your Flight</h2>
        <div className="card shadow-lg">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                {[
                  { id: 'departureAirport', label: 'Origin:', placeholder: 'Enter departure airport', type: 'text', value: departureAirport, onChange: (e) => setDepartureAirport(e.target.value) },
                  { id: 'destinationAirport', label: 'Destination:', placeholder: 'Enter destination airport', type: 'text', value: destinationAirport, onChange: (e) => setDestinationAirport(e.target.value) },
                  { id: 'departureDate', label: 'Departure Date:', type: 'date', value: departureDate, onChange: (e) => setDepartureDate(e.target.value) },
                ].map((field, index) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <label htmlFor={field.id} className="form-label">{field.label}</label>
                    <input
                      type={field.type}
                      className="form-control"
                      id={field.id}
                      placeholder={field.placeholder}
                      min={field.min}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100">Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
