import React from 'react';

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
    <footer className="bg-warning text-dark py-2 mt-auto" style={{ marginTop: '20px' }}>
      <div className="container">
        {/* Main Footer Content */}
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-dark" style={{ textDecoration: 'none' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-3 mb-3">
            <h5>Contact</h5>
            <p>Email: <a href="mailto:info@gonow.com" className="text-dark" style={{ textDecoration: 'none' }}>info@gonow.com</a></p>
            <p>Phone: <a href="tel:+2348068199955" className="text-dark" style={{ textDecoration: 'none' }}>+2348068199955</a></p>
            <p>Address: 5 Cosmos Close, Uyo, Nigeria</p>
          </div>

          {/* Social Media Links */}
          <div className="col-md-3 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    className="text-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download Section */}
          <div className="col-md-3 mb-3">
            <h5>Download Our App</h5>
            <a
              href="https://play.google.com/store/apps/details?id=com.gonow"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
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
        <div className="row justify-content-center py-2">
          <div className="col-md-6 text-center">
            <h5 className="mb-2">Secure Payment Options</h5>
            <div className="d-flex justify-content-center gap-3">
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
        <div className="row border-top pt-2">
          <div className="col text-center">
            <p className="mb-0 text-warning">
              &copy; 2025 <strong>GoNow</strong>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
