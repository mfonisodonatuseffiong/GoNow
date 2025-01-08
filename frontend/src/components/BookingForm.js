import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookingForm.css'; // Import the CSS file

const BookingForm = () => {
  const location = useLocation();
  const flight = location.state?.flight;
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    passport: '',
    dateOfBirth: '',
    seatPreference: '',
    mealPreference: '',
    flightClass: '',
    flightId: flight?.id || '',
    price: flight?.price || 0,
    lastTicketingDate: flight?.lastTicketingDate || '',
    numberOfBookableSeats: flight?.numberOfBookableSeats || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (flight) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        flightId: flight.id,
      }));
    }
    console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('Flight data:', flight); // Debugging line
  }, [flight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const price = Number(userDetails.price); // Convert to number
    const flightOffers = [{
      type: 'flight-offer',
      id: userDetails.flightId,
      source: 'GDS',
      instantTicketingRequired: false,
      disablePricing: false,
      nonHomogeneous: false,
      oneWay: false,
      paymentCardRequired: false,
      lastTicketingDate: userDetails.lastTicketingDate,
      numberOfBookableSeats: userDetails.numberOfBookableSeats,
      itineraries: [{
        duration: 'PT6H15M',
        segments: [{
          id: '1',
          type: 'flight-segment',
          departure: { iataCode: 'JFK', terminal: '4', at: '2025-02-02T14:15:00' },
          arrival: { iataCode: 'LAX', terminal: '7', at: '2025-02-02T17:30:00' },
          carrierCode: 'UA',
          number: '404',
          aircraft: { code: '738' },
          operating: { carrierCode: 'UA' },
          duration: 'PT6H15M',
          numberOfStops: 0,
          blacklistedInEU: false,
        }],
      }],
      price: {
        currency: 'USD',
        total: price,
        base: price - 20.00, // Ensure this is a number and subtract fee
        fees: [{ amount: '20.00', type: 'CREDIT_CARD' }],
        grandTotal: price, // Ensure this is a number
      },
      travelerPricings: [{
        travelerId: '1',
        fareOption: 'STANDARD',
        travelerType: 'ADULT',
        price: { currency: 'USD', total: price, base: price - 20.00 },
        fareDetailsBySegment: [{ segmentId: '1', cabin: 'ECONOMY', fareBasis: 'Y' }],
      }],
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    }];

    const travelers = [{
      id: '1',
      travelerType: 'ADULT',
      dateOfBirth: userDetails.dateOfBirth,
      name: { firstName: userDetails.name.split(' ')[0], lastName: userDetails.name.split(' ')[1] || '' },
      gender: 'MALE',
      contact: { emailAddress: userDetails.email, phones: [{ deviceType: 'MOBILE', number: userDetails.phone }] },
      documents: [{
        documentType: 'PASSPORT',
        number: userDetails.passport,
        issuanceDate: '2018-01-01',
        expiryDate: '2028-01-01',
        issuanceCountry: 'US',
        issuanceLocation: 'New-York',
        nationality: 'US',
        birthPlace: 'New-York',
        validityCountry: 'US',
        birthCountry: 'US',
        holder: true,
      }],
    }];

    // Log the booking data for debugging
    console.log('Booking data:', { data: { type: 'flight-order', flightOffers }, travelers });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/booking/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { type: 'flight-order', flightOffers }, travelers }),
      });
      console.log('Response:', response);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(errorResponse.error || 'Failed to book the flight');
      }

      const bookingDetails = await response.json();
      navigate('/booking-confirmation', { state: bookingDetails });

      setUserDetails({
        name: '',
        email: '',
        phone: '',
        passport: '',
        dateOfBirth: '',
        seatPreference: '',
        mealPreference: '',
        flightClass: '',
        flightId: flight?.id || '',
        price: flight?.price || 0,
        lastTicketingDate: flight?.lastTicketingDate || '',
        numberOfBookableSeats: flight?.numberOfBookableSeats || 0,
      });
    } catch (err) {
      setError(err.message);
      alert(`Error booking flight: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 text-dark" style={{ width: '600px', backgroundColor: '#f8f9fa', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 className="text-center text-info mb-4 dancing-text">Book Your Flight</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {flight ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="flightDetails" className="form-label">Flight Details</label>
            <textarea className="form-control" id="flightDetails" value={`Flight ID: ${flight.id}\nLast Ticketing Date: ${flight.lastTicketingDate}\nSeats Available: ${flight.numberOfBookableSeats}\nPrice: ${flight.price} ${flight.currency}\nCarrier: ${flight.carrier}`} readOnly rows="5"></textarea>
          </div>
          {[{ label: 'Full Name', type: 'text', id: 'name' }, { label: 'Email', type: 'email', id: 'email' }, { label: 'Phone Number', type: 'text', id: 'phone' }, { label: 'Passport Number', type: 'text', id: 'passport' }, { label: 'Date of Birth', type: 'date', id: 'dateOfBirth' }].map(({ label, type, id }) => (
            <div className="mb-3" key={id}>
              <label htmlFor={id} className="form-label">{label}</label>
              <input type={type} className="form-control" id={id} name={id} value={userDetails[id]} onChange={handleChange} required />
            </div>
          ))}
          {[{ label: 'Seat Preference', id: 'seatPreference', options: ['Window', 'Aisle', 'Middle'] }, { label: 'Meal Preference', id: 'mealPreference', options: ['Vegetarian', 'Non-Vegetarian', 'Vegan'] }, { label: 'Class', id: 'flightClass', options: ['Economy', 'Business', 'First Class'] }].map(({ label, id, options }) => (
            <div className="mb-3" key={id}>
              <label htmlFor={id} className="form-label">{label}</label>
              <select className="form-select" id={id} name={id} value={userDetails[id]} onChange={handleChange} required>
                <option value="">Select a preference</option>
                {options.map(option => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-info w-50" disabled={loading}>
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      ) : (
        <div className="alert alert-warning">No flight selected. Please select a flight to proceed with booking.</div>
      )}
    </div>
  );
};

export default BookingForm;
