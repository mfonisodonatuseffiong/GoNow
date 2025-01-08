// models/Country.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Sequelize connection

const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'countries',  // Make sure your table name is 'countries'
});

module.exports = Country;
