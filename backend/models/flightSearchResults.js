const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path as necessary

const FlightSearchResults = sequelize.define('flight_search_results', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  search_timestamp: { type: DataTypes.DATE, allowNull: false },
  flight_data: { type: DataTypes.JSONB, allowNull: false },
}, {
  tableName: 'flight_search_results',
  timestamps: false,
});

module.exports = FlightSearchResults;
