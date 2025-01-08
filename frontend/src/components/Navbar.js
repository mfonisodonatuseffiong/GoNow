import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAdmin }) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const queryParts = searchQuery.split(',');
        if (queryParts.length === 3) {
            const origin = queryParts[0].trim();
            const destination = queryParts[1].trim();
            const date = queryParts[2].trim();
            if (origin && destination && date) {
                // Navigate to the flight search page with query parameters
                const params = new URLSearchParams({ origin, destination, date });
                navigate(`/flight-search?${params.toString()}`);
            } else {
                alert('Please provide origin, destination, and date in the format: origin,destination,date');
            }
        } else {
            alert('Please provide search query in the format: origin,destination,date');
        }
    };

    const handleFlightBookingClick = () => {
        navigate('/booking-form', { state: { message: 'No flight selected. Please select a flight to proceed with booking.' } });
    };

    const renderAdminMenu = () => (
        <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle btn btn-link bg-info" id="adminDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: 'inherit' }}>
                <i className="bi bi-shield-lock" style={{ marginRight: '10px' }}></i> Admin
            </button>
            <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                <li>
                    <Link className="dropdown-item text-muted" to="/admin-dashboard" style={{ fontSize: '0.9rem' }}>
                        <i className="bi bi-house-door" style={{ marginRight: '10px' }}></i> Admin Dashboard
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/admin/users">
                        <i className="bi bi-person-lines-fill" style={{ marginRight: '10px' }}></i> Manage Users
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item text-danger bg-info" to="/admin/settings">
                        <i className="bi bi-gear" style={{ marginRight: '10px' }}></i> Settings
                    </Link>
                </li>
            </ul>
        </li>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>GoNow</span>
                    <div style={{ fontSize: '1rem', fontStyle: 'italic', color: '#fff' }}> .....Fast and Reliable </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="bi bi-house-door" style={{ marginRight: '10px' }}></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                <i className="bi bi-info-circle" style={{ marginRight: '10px' }}></i> About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                <i className="bi bi-envelope" style={{ marginRight: '10px' }}></i> Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                <i className="bi bi-speedometer2" style={{ marginRight: '10px' }}></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="bi bi-box-arrow-in-right" style={{ marginRight: '10px' }}></i> Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                <i className="bi bi-person-plus" style={{ marginRight: '10px' }}></i> Signup
                            </Link>
                        </li>
                        <li className="nav-item dropdown bg-danger">
                            <button className="nav-link dropdown-toggle btn btn-link" id="servicesDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="bi bi-briefcase" style={{ marginRight: '10px' }}></i> Services
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                                <li>
                                    <button className="dropdown-item" onClick={handleFlightBookingClick}>
                                        <i className="bi bi-airplane-engines" style={{ marginRight: '10px' }}></i> Flight Booking
                                    </button>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/flight-reservation">
                                        <i className="bi bi-calendar-check" style={{ marginRight: '10px' }}></i> Flight Reservation
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/flight-schedules">
                                        <i className="bi bi-calendar-event" style={{ marginRight: '10px' }}></i> Flight Schedules
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/ticket-management">
                                        <i className="bi bi-ticket-perforated" style={{ marginRight: '10px' }}></i> Ticket Management
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/flight-status">
                                        <i className="bi bi-clock" style={{ marginRight: '10px' }}></i> Flight Status
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/flight-search">
                                        <i className="bi bi-search" style={{ marginRight: '10px' }}></i> Flight Search
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/notifications">
                                        <i className="bi bi-bell" style={{ marginRight: '10px' }}></i> Notifications
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/support">
                                        <i className="bi bi-headset" style={{ marginRight: '10px' }}></i> Support
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item text-white bg-success" to="/checkout">
                                        <i className="bi bi-credit-card" style={{ marginRight: '10px' }}></i> Proceed to Checkout
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item text-white bg-success" to="/make-payment">
                                        <i className="bi bi-credit-card" style={{ marginRight: '10px' }}></i> Make Payment
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item text-white bg-danger" to="/contact">
                                        <i className="bi bi-envelope" style={{ marginRight: '10px' }}></i> Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {isAdmin && renderAdminMenu()}
                        <li className="nav-item">
                            <form className="d-flex" onSubmit={handleSearchSubmit}>
                                <input className="form-control me-2" type="search" placeholder="Origin, Destination, Date" aria-label="Search" value={searchQuery} onChange={handleSearchChange} />
                                <button className="btn btn-outline-dark" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
