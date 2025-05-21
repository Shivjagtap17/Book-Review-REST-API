const {
    addReview,
    getReviewById,
    updateReview,
    deleteReview,
    hasUserReviewedBook,
  } = require('../models/reviewModel');
  
  const submitReview = async (req, res) => {
    try {
      const userId = req.user.userId;
      const bookId = req.params.id;
      const { rating, comment } = req.body;
  
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }
  
      // Check if user already reviewed the book
      const alreadyReviewed = await hasUserReviewedBook(userId, bookId);
      if (alreadyReviewed) {
        return res.status(400).json({ message: 'User has already reviewed this book' });
      }
  
      const reviewId = await addReview({ bookId, userId, rating, comment });
      res.status(201).json({ message: 'Review submitted', reviewId });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const updateUserReview = async (req, res) => {
    try {
      const userId = req.user.userId;
      const reviewId = req.params.id;
      const { rating, comment } = req.body;
  
      const review = await getReviewById(reviewId);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      if (review.user_id !== userId) return res.status(403).json({ message: 'Forbidden' });
  
      if (rating && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }
  
      await updateReview(reviewId, rating || review.rating, comment || review.comment);
      res.json({ message: 'Review updated' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const deleteUserReview = async (req, res) => {
    try {
      const userId = req.user.userId;
      const reviewId = req.params.id;
  
      const review = await getReviewById(reviewId);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      if (review.user_id !== userId) return res.status(403).json({ message: 'Forbidden' });
  
      await deleteReview(reviewId);
      res.json({ message: 'Review deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = { submitReview, updateUserReview, deleteUserReview };
  