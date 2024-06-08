const express = require('express');

const {
  getAllProduce, getProduceById, addProduce, deleteProduce,
  updateProduce,
  getProducesByFarmer,
} = require('../controllers');
const tryCatch = require('../utils/tryCatch');
const validateProduce = require('../middleware/validation/produce-validation');
const isLoggedIn = require('../middleware/auth/isLoggedIn');
const isFarmer = require('../middleware/auth/isFarmer');
const isAuthor = require('../middleware/auth/isAuthor');

const router = express.Router();

router.route('/produces')
  .get(tryCatch(getAllProduce))
  .post(isLoggedIn, isFarmer, validateProduce, tryCatch(addProduce));
router.route('/produces/:id')
  .get(tryCatch(getProduceById))
  .put(isLoggedIn, isAuthor, tryCatch(updateProduce))
  .delete(isLoggedIn, isAuthor, tryCatch(deleteProduce));
router.route('/farmers/:farmerId/produces')
  .get(tryCatch(getProducesByFarmer));

module.exports = router;
