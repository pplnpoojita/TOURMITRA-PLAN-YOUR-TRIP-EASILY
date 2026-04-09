const express = require('express');
const router = express.Router();
const { submitQuery, getQueries, replyToQuery, getMyQueries } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/my-messages').get(protect, getMyQueries);
router.route('/').post(submitQuery).get(getQueries);
router.route('/:id/reply').patch(replyToQuery);

module.exports = router;
