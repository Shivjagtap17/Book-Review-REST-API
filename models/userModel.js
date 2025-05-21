const pool = require('./db');

async function createUser(username, hashedPassword) {
  const [result] = await pool.query(
    'INSERT INTO users (username, password) VALUES (?, ?)', 
    [username, hashedPassword]
  );
  return result.insertId;
}

async function getUserByUsername(username) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username = ?', 
    [username]
  );
  return rows[0];
}

async function getUserById(id) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE id = ?', 
    [id]
  );
  return rows[0];
}

module.exports = { createUser, getUserByUsername, getUserById };
