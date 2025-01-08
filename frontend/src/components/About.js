import React from 'react';
import './About.css'; // Link to a CSS file for styling
import { FaPlaneDeparture, FaPlaneArrival, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <FaPlaneDeparture className="about-icon" />
        <h1 className="about-title">About Us</h1>
      </div>
      <p className="about-text">
        Welcome to <span className="highlight">GoNow</span>, your ultimate solution for efficient and reliable flight management. 
        Our web application is designed to streamline the process of booking, scheduling, and managing flights for both passengers and airline operators.
      </p>
      <div className="about-details">
        <div className="detail-item">
          <FaGlobe className="detail-icon" />
          <h2>Global Reach</h2>
          <p>
            Whether you're traveling across continents or managing regional flights, GoNow is built to handle it all with ease.
          </p>
        </div>
        <div className="detail-item">
          <FaPlaneArrival className="detail-icon" />
          <h2>Real-Time Updates</h2>
          <p>
            Stay informed with real-time flight status updates and notifications, ensuring you never miss a moment.
          </p>
        </div>
      </div>
      <p className="about-footer">
        At GoNow, we are committed to revolutionizing the way you manage flights by offering innovative tools and a seamless user experience.
      </p>
    </div>
  );
};

export default About;
