const { addBook, getBooks, getBookById, getAverageRating } = require('../models/bookModel');
const { getReviewsByBookId } = require('../models/reviewModel');

const addNewBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author required' });
    }
    const bookId = await addBook({ title, author, genre });
    res.status(201).json({ message: 'Book added', bookId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const listBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const books = await getBooks({ page, limit, author, genre });
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const book = await getBookById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const avgRating = await getAverageRating(bookId);
    const reviews = await getReviewsByBookId(bookId, page, limit);

    res.json({ book, averageRating: avgRating, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addNewBook, listBooks, getBookDetails };
