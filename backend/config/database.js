const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Check for required environment variables
const requiredEnvVars = ['PG_HOST', 'PG_USER', 'PG_PASSWORD', 'PG_DATABASE', 'PG_PORT'];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: Missing required environment variable ${key}`);
    process.exit(1); // Exit process if any required environment variable is missing
  }
});

// Initialize Sequelize with environment variables
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) || 5432, // Default to port 5432 if not provided
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  logging: process.env.NODE_ENV === 'development', // Log only in development mode
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit process on failure
  }
})();

module.exports = sequelize; // Export the Sequelize instance
