import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";  // Import the custom CSS file

function AdminDashboard() {
  return (
    <div className="container mt-5 text-dark">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="row g-4">
        {/* Manage Flights */}
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Flight Management</div>
            <div className="card-body card-body-custom">
              <h5 className="card-title">Manage Flights</h5>
              <p className="card-text">
                Add, update, or delete flight schedules and inventory.
              </p>
              <Link to="/admin/add-update-flights" className="btn btn-light mt-auto">
                Go to Flight Management
              </Link>
            </div>
          </div>
        </div>

        {/* Manage Users */}
        <div className="col-md-4">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">User Management</div>
            <div className="card-body card-body-custom">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">
                View, add, or remove users from the system.
              </p>
              <Link to="/admin/users" className="btn btn-light mt-auto">
                Go to User Management
              </Link>
            </div>
          </div>
        </div>

        {/* Flight Inventory */}
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Flight Inventory</div>
            <div className="card-body card-body-custom">
              <h5 className="card-title">Available Flights</h5>
              <p className="card-text">
                Check the available flights and their occupancy status.
              </p>
              <Link to="/admin/flight-inventory" className="btn btn-light mt-auto">
                View Flight Inventory
              </Link>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Settings</div>
            <div className="card-body card-body-custom">
              <h5 className="card-title">System Settings</h5>
              <p className="card-text">
                Configure system settings and preferences.
              </p>
              <Link to="/admin/settings" className="btn btn-light mt-auto">
                Go to Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Reports</div>
            <div className="card-body card-body-custom">
              <h5 className="card-title">Generate Reports</h5>
              <p className="card-text">
                Generate detailed reports for flights and user activity.
              </p>
              <Link to="/admin/reports" className="btn btn-light mt-auto">
                View Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Support</div>
            <div className="card-body card-body-custom">
              <h5 className="card-title">Admin Support</h5>
              <p className="card-text">
                Get help with administrative tasks and troubleshooting.
              </p>
              <Link to="/admin/support" className="btn btn-light mt-auto">
                Go to Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
