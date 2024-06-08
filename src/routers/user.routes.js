const express = require('express');

const { getAllUsers, register, getUserById } = require('../controllers');
const tryCatch = require('../utils/tryCatch');
const validateUser = require('../middleware/validation/user-validation');

const router = express.Router();

router.get('/users', tryCatch(getAllUsers));
router.get('/users/:id', tryCatch(getUserById));
router.post('/register', validateUser, tryCatch(register));

module.exports = router;
