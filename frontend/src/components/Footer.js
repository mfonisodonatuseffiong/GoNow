import React from 'react';
import './Footer.css'; // Ensure CSS is imported correctly

const Footer = () => {
  const quickLinks = [
    { href: "/explore", label: "Explore Flights" },
    { href: "/signup", label: "Join Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com", label: "Facebook" },
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://www.instagram.com", label: "Instagram" },
    { href: "https://www.linkedin.com", label: "LinkedIn" },
  ];

  const paymentOptions = [
    { src: "/images/mastercard.png", alt: "MasterCard" },
    { src: "/images/visa.png", alt: "Visa" },
    { src: "/images/paypal.png", alt: "PayPal" },
  ];

  return (
    <footer className="footer-container">
      <div className="container text-center">
        {/* Main Footer Content */}
        <div className="row justify-content-center">
          {/* Quick Links */}
          <div className="col-md-3 mb-2">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-3 mb-2">
            <h5>Contact</h5>
            <p>Email: <a href="mailto:info@gonow.com" className="footer-link">info@gonow.com</a></p>
            <p>Phone: <a href="tel:+2348068199900" className="footer-link">+2348068199900</a></p>
            <p>Address: 5 Cosmos Close, Uyo, Nigeria</p>
          </div>

          {/* Social Media Links */}
          <div className="col-md-3 mb-2">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download Section */}
          <div className="col-md-3 mb-2">
            <h5>Download Our App</h5>
            <a
              href="https://play.google.com/store/apps/details?id=com.gonow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/playstore.png"
                alt="Download from Google Play"
                style={{ width: '180px' }}
              />
            </a>
          </div>
        </div>

        {/* Payment Options */}
        <div className="row justify-content-center py-1">
          <div className="col-md-6 text-center">
            <h5 className="mb-1">Secure Payment Options</h5>
            <div className="d-flex justify-content-center gap-2 payment-options">
              {paymentOptions.map((option, index) => (
                <img
                  key={index}
                  src={option.src}
                  alt={option.alt}
                  className="img-fluid"
                  style={{ maxWidth: "50px", height: "auto" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row footer-bottom">
          <div className="col text-center bg-dark">
            <p className="mb-0 text-white">
              &copy; 2025 <strong>GoNow</strong>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
