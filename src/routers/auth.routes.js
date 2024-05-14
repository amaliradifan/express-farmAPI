const express = require('express');

const { login, logout } = require('../controllers');
const tryCatch = require('../utils/tryCatch');
const isLoggedIn = require('../middleware/auth/isLoggedIn');

const router = express.Router();

router.post('/login', tryCatch(login));
router.post('/logout', isLoggedIn, tryCatch(logout));

module.exports = router;
