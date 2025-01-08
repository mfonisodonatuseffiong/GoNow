import React, { useState } from 'react';

function FlightReservationForm() {
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    classType: 'Economy',
    preferences: 'None',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Integrate backend API call here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-secondary rounded shadow text-center">
      <h2 tex-center>Flight Reservation</h2>

      <div className="mb-3">
        <label htmlFor="departure" className="form-label">Departure City</label>
        <input
          type="text"
          id="departure"
          name="departure"
          className="form-control"
          value={formData.departure}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="arrival" className="form-label">Arrival City</label>
        <input
          type="text"
          id="arrival"
          name="arrival"
          className="form-control"
          value={formData.arrival}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="departureDate" className="form-label">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            className="form-control"
            value={formData.departureDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="returnDate" className="form-label">Return Date</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            className="form-control"
            value={formData.returnDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="passengers" className="form-label">Passengers</label>
          <input
            type="number"
            id="passengers"
            name="passengers"
            className="form-control"
            min="1"
            value={formData.passengers}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col">
          <label htmlFor="classType" className="form-label">Class</label>
          <select
            id="classType"
            name="classType"
            className="form-select"
            value={formData.classType}
            onChange={handleInputChange}
            required
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First Class">First Class</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="preferences" className="form-label">Preferences</label>
        <input
          type="text"
          id="preferences"
          name="preferences"
          className="form-control"
          placeholder="e.g., Non-stop, Window Seat"
          value={formData.preferences}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary w-30">Search Flights</button>
    </form>
  );
}

export default FlightReservationForm;
