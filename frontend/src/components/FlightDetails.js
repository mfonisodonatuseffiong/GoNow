import React from 'react';

function FlightDetails() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Flight Details</h1>
      <p className="text-muted text-center">
        Here, you can add or update flight information.
      </p>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form>
            <div className="mb-3">
              <label htmlFor="flightNumber" className="form-label">Flight Number</label>
              <input type="text" className="form-control" id="flightNumber" placeholder="Enter flight number" />
            </div>

            <div className="mb-3">
              <label htmlFor="departure" className="form-label">Departure Location</label>
              <input type="text" className="form-control" id="departure" placeholder="Enter departure location" />
            </div>

            <div className="mb-3">
              <label htmlFor="destination" className="form-label">Destination</label>
              <input type="text" className="form-control" id="destination" placeholder="Enter destination" />
            </div>

            <div className="mb-3">
              <label htmlFor="departureTime" className="form-label">Departure Time</label>
              <input type="datetime-local" className="form-control" id="departureTime" />
            </div>

            <div className="mb-3">
              <label htmlFor="arrivalTime" className="form-label">Arrival Time</label>
              <input type="datetime-local" className="form-control" id="arrivalTime" />
            </div>

            <button type="submit" className="btn btn-primary w-100">Save Flight Details</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FlightDetails;
