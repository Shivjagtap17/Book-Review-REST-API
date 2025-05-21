const express = require('express');
const { updateUserReview, deleteUserReview } = require('../controllers/reviewController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.put('/reviews/:id', authenticateToken, updateUserReview);
router.delete('/reviews/:id', authenticateToken, deleteUserReview);

module.exports = router;
