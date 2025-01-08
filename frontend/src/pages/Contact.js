import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/send-email', {
        recipient: 'kaytwobaba@gmail.com',  // Replace with your email
        subject: 'Contact Form Submission',  // You can adjust this as needed
        body: `
          Name: ${formData.name}
          Email: ${formData.email}
          Message: ${formData.message}
        `
      });
      setStatus(response.data.message);  // Assuming backend sends a message
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      {status ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%', marginTop: '100px' }}>
            <div className="card-body text-center">
              <h2 className="text-success">{status}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="card mt-4 p-4 shadow-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="text-center text-info mb-4">Contact Us</h2>
          <p className="text-center mb-4">We'd love to hear from you. Please fill out the form below, and we’ll get back to you shortly.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contact;
