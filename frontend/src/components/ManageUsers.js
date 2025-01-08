import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // To navigate programmatically

  // Fetch the list of users from your API or database
  useEffect(() => {
    fetch("/api/users") // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleClose = () => {
    // Redirect to another page or close the modal
    navigate("/admin/dashboard"); // Redirect to Admin Dashboard (or another page)
  };

  return (
    <div className="container mt-5">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="btn btn-danger position-absolute top-0 end-0 m-3"
        style={{ zIndex: 999 }}
      >
        X
      </button>

      <h1 className="text-center mb-4 text-dark">Manage Users</h1>
      <div className="d-flex justify-content-between mb-4">
        <Link to="/admin/add-user" className="btn btn-primary">
          Add New User
        </Link>
        <Link to="/admin/edit-user" className="btn btn-warning">
          Edit User
        </Link>
      </div>

      {/* Table to display the list of users */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/admin/edit-user/${user.id}`} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                  <button className="btn btn-danger btn-sm ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
