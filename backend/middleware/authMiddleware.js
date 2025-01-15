const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. Authorization header missing.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Optional: Log the user details for debugging
    // console.log(`Authenticated user: ${decoded.email}`);

    next(); // Proceed to the next middleware or route
  } catch (err) {
    // Handle token errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired. Please log in again.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ error: 'Invalid token. Please log in again.' });
    }

    // Generic error handling
    return res.status(400).json({ error: 'Authentication failed.' });
  }
};

// Middleware to check if the user has admin role
const checkAdmin = (req, res, next) => {
  // Ensure the user is authenticated first
  checkAuth(req, res, () => {
    // Check if the user has the admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    // Optional: Log user details for debugging
    // console.log(`Admin access granted to user: ${req.user.email}`);

    next(); // Proceed to the next middleware or route
  });
};

module.exports = { checkAuth, checkAdmin };
