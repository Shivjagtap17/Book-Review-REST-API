const pool = require('./db');

async function getReviewsByBookId(bookId, page = 1, limit = 5) {
  const offset = (page - 1) * limit;
  const [rows] = await pool.query(
    `SELECT r.id, r.rating, r.comment, r.created_at, r.updated_at, u.username 
     FROM reviews r JOIN users u ON r.user_id = u.id 
     WHERE r.book_id = ? ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
    [bookId, limit, offset]
  );
  return rows;
}

async function addReview({ bookId, userId, rating, comment }) {
  const [result] = await pool.query(
    'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
    [bookId, userId, rating, comment]
  );
  return result.insertId;
}

async function getReviewById(id) {
  const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [id]);
  return rows[0];
}

async function updateReview(id, rating, comment) {
  await pool.query(
    'UPDATE reviews SET rating = ?, comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [rating, comment, id]
  );
}

async function deleteReview(id) {
  await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
}

async function hasUserReviewedBook(userId, bookId) {
  const [rows] = await pool.query(
    'SELECT * FROM reviews WHERE user_id = ? AND book_id = ?', [userId, bookId]
  );
  return rows.length > 0;
}

module.exports = {
  getReviewsByBookId,
  addReview,
  getReviewById,
  updateReview,
  deleteReview,
  hasUserReviewedBook,
};
