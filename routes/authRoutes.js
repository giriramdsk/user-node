const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { validateSignup } = require('../validators/authValidator');
const router = express.Router();

router.post('/signup',validateSignup, signup);
router.post('/login', login);
router.post('/logout',blackListAdd);

module.exports = router;
