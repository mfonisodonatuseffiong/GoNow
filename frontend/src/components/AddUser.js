import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // To navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding the user logic here (e.g., send data to API)
    console.log({ name, email, role });
  };

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

      <h1 className="text-center mb-4 text-black">Add New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-black">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 text-black">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 text-black">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUser;
