const express = require('express');
const router = express.Router();
const { registerUser, authUser, resetPassword } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/reset-password', resetPassword);

module.exports = router;
