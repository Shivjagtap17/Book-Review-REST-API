const pool = require('./db');

async function addBook({ title, author, genre }) {
  const [result] = await pool.query(
    'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)', 
    [title, author, genre]
  );
  return result.insertId;
}

async function getBooks({ page = 1, limit = 10, author, genre }) {
  let sql = 'SELECT * FROM books WHERE 1=1';
  const params = [];

  if (author) {
    sql += ' AND author LIKE ?';
    params.push(`%${author}%`);
  }
  if (genre) {
    sql += ' AND genre LIKE ?';
    params.push(`%${genre}%`);
  }

  sql += ' LIMIT ? OFFSET ?';
  params.push(parseInt(limit), (page - 1) * limit);

  const [rows] = await pool.query(sql, params);
  return rows;
}

async function getBookById(id) {
  const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
}

async function getAverageRating(bookId) {
  const [rows] = await pool.query(
    'SELECT AVG(rating) as avgRating FROM reviews WHERE book_id = ?', [bookId]
  );
  return rows[0].avgRating || 0;
}

module.exports = { addBook, getBooks, getBookById, getAverageRating };
