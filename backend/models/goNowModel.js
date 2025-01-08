// flightModel.js
const { Pool } = require('pg');
const pool = new Pool({
  user: 'mfoniso',
  host: 'localhost',
  database: 'GoNow',
  password: 'effiongeffiong',
  port: 5432,
});

const Flight = {
  find: async (searchCriteria) => {
    const { departure, destination, date } = searchCriteria;
    const query = `SELECT * FROM flights WHERE departure_city = $1 AND destination_city = $2 AND flight_date = $3`;
    const values = [departure, destination, date];

    try {
      const res = await pool.query(query, values);
      return res.rows;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Flight;
