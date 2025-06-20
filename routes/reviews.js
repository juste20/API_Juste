const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reviewCtrl = require('../controllers/reviewController');

router.post('/:bookId', auth, reviewCtrl.createReview);
router.get('/:bookId', auth, reviewCtrl.getReviews);

module.exports = router;
