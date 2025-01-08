const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../middlewares/authMiddleware'); // Middleware for admin verification
const db = require('../config/database'); // PostgreSQL database connection

// Get all settings
router.get('/', checkAdmin, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM settings');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update a setting
router.put('/:key', checkAdmin, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  try {
    await db.query(
      'UPDATE settings SET value = $1, updated_at = NOW() WHERE key = $2',
      [value, key]
    );
    res.status(200).json({ message: 'Setting updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

module.exports = router;
