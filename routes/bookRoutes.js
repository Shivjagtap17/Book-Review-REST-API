// Append this in bookRoutes.js:
const pool = require('../models/db');
const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Query missing' });

    const [rows] = await pool.query(
      `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      [`%${q}%`, `%${q}%`]
    );
    res.json({ results: rows });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;