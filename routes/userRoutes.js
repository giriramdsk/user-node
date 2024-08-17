const express = require('express');
const { listUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/users',verifyUser,checkBlacklist, listUsers);

module.exports = router;
