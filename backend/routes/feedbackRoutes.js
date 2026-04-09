const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbacks, getMyFeedbacks, replyToFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

router.route('/my-feedbacks').get(protect, getMyFeedbacks);
router.route('/').post(submitFeedback).get(getFeedbacks);
router.route('/:id/reply').patch(replyToFeedback);

module.exports = router;
