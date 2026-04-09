const express = require('express');
const router = express.Router();
const { getUserProfile, getAllUsers, addVisitedPlace, updateProfilePhoto, pingUser, logoutUser, getOnlineUsersCount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/profile').get(protect, getUserProfile);
router.route('/photo').put(protect, updateProfilePhoto);
router.route('/visit').put(protect, addVisitedPlace);
router.route('/ping').put(protect, pingUser);
router.route('/logout').put(protect, logoutUser);
router.route('/online').get(getOnlineUsersCount);
router.route('/').get(getAllUsers); // For admin panel to get user stats

module.exports = router;
