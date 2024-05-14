const express = require('express');

const { getAllDistributors } = require('../controllers');
const tryCatch = require('../utils/tryCatch');

const router = express.Router();

router.route('/distributors')
  .get(tryCatch(getAllDistributors));

module.exports = router;
