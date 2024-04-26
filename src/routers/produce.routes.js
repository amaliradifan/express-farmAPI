const express = require('express');

const {
  getAllProduce, getProduceById, addProduce, deleteProduce,
  updateProduce,
} = require('../controllers');
const tryCatch = require('../utils/tryCatch');
const validateMovie = require('../middleware/validation/produce-validation');

const router = express.Router();

router.route('/produces')
  .get(getAllProduce)
  .post(validateMovie, tryCatch(addProduce));
router.route('/produces/:id')
  .get(tryCatch(getProduceById))
  .put(tryCatch(updateProduce))
  .delete(tryCatch(deleteProduce));

module.exports = router;
