import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Explore from './components/Explore';
import TransactionHistory from './components/TransactionHistory';
import BookingForm from './components/BookingForm'; // Correctly imported BookingForm
import FlightReservation from './components/FlightReservation';
import FlightSchedules from './components/FlightSchedules';
import TicketManagement from './components/TicketManagement';
import FlightStatus from './components/FlightStatus';
import Notifications from './components/Notifications';
import Support from './components/Support';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Contact from './pages/Contact';
import About from './components/About';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import Settings from './components/Settings';
import FlightSearchResults from './components/FlightSearchResults';
import FlightSearch from './components/FlightSearch';
import CheckDeals from './components/CheckDeals'; // Import CheckDeals component
import SeasonalOffers from './components/SeasonalOffers'; // Import SeasonalOffers component
import PromotionsAndDeals from './components/PromotionsAndDeals'; // Import PromotionsAndDeals component
import ShopNow from './components/ShopNow'; // Import the ShopNow component

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = { role: 'admin' };
    setIsAdmin(user?.role === 'admin');
  }, []);

  const handleLogin = (username, email) => {
    setUser({ username, email });
  };

  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/booking-form" element={<BookingForm />} /> {/* Corrected route for BookingForm */}
          <Route path="/flight-reservation" element={<FlightReservation />} />
          <Route path="/flight-schedules" element={<FlightSchedules />} />
          <Route path="/ticket-management" element={<TicketManagement />} />
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/support" element={<Support />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/flight-search-results" element={<FlightSearchResults />} /> {/* Updated route path */}

          {/* Admin Routes */}
          {isAdmin && (
            <>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/add-user" element={<AddUser />} />
              <Route path="/admin/edit-user/:id" element={<EditUser />} />
              <Route path="/admin/settings" element={<Settings />} />
            </>
          )}

          {/* Flight Search Route */}
          <Route path="/flight-search" element={<FlightSearch />} />

          {/* Check Deals Route */}
          <Route path="/check-deals" element={<CheckDeals />} /> {/* Added CheckDeals route */}

          {/* Seasonal Offers Route */}
          <Route path="/seasonal-offers" element={<SeasonalOffers />} /> {/* Added Seasonal Offers route */}

          {/* Promotions & Deals Route */}
          <Route path="/promotions-and-deals" element={<PromotionsAndDeals />} /> {/* Added Promotions & Deals route */}

          {/* Shop Now Page Route */}
          <Route path="/shop-now" element={<ShopNow />} /> {/* Added Shop Now route */}

          {/* 404 Route */}
          <Route path="*" element={<h2 className="text-center mt-5" style={{ color: 'black' }}>404 - Page Not Found</h2>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
