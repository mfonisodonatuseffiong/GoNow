const jwt = require('jsonwebtoken');
const { User, Booking } = require('../models'); // Import Sequelize models

const getDashboardData = async (req, res) => {
  try {
    // Step 1: Extract token from Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Token not found.' });
    }

    // Step 2: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is defined in environment

    // Step 3: Fetch user data based on the decoded token
    const user = await User.findOne({
      where: { id: decoded.userId },
      include: [{ model: Booking }], // Populate related bookings
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 4: Return user data and bookings
    res.json({
      user: {
        username: user.username,
        email: user.email,
      },
      bookings: user.Bookings || [], // If bookings exist, return them, otherwise return an empty array
    });
  } catch (error) {
    // Step 5: Handle different error types
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token. Please log in again.' });
    }

    // Log and return a generic server error
    console.error('Error occurred while fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardData };
