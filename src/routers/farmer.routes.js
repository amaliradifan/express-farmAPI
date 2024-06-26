const express = require('express');

const { getAllFarmers } = require('../controllers');
const tryCatch = require('../utils/tryCatch');

const router = express.Router();

router.route('/farmers')
  .get(tryCatch(getAllFarmers));

module.exports = router;
