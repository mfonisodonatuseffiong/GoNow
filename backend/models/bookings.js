const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as necessary

const Bookings = sequelize.define('Bookings', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  flight_id: { type: DataTypes.INTEGER, allowNull: false },
  booking_details: { type: DataTypes.JSONB, allowNull: false },
}, {
  tableName: 'bookings',
  timestamps: false,
});

module.exports = Bookings;
