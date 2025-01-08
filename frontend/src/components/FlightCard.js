// src/components/FlightCard.js

import React from 'react';

function FlightCard({ flight, onBookNow }) {
  return (
    <div className="card">
      <img src={flight.image} className="card-img-top" alt={flight.title} />
      <div className="card-body">
        <h5 className="card-title">{flight.title}</h5>
        <p className="card-text">{flight.description}</p>
        <button className="btn btn-warning" onClick={onBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default FlightCard;
