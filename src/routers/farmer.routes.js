const express = require('express');

const { getAllFarmers, addFarmer } = require('../controllers');
const tryCatch = require('../utils/tryCatch');
const validateFarmer = require('../middleware/validation/farmer-validation');

const router = express.Router();

router.route('/farmers')
  .get(tryCatch(getAllFarmers))
  .post(validateFarmer, tryCatch(addFarmer));

module.exports = router;
