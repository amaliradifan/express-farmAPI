const produceController = require('./produce.controller');
const farmerController = require('./farmer.controller');
const distributorController = require('./distributor.controller');
const userController = require('./user.controller');
const authController = require('./auth.controller');

module.exports = {
  ...produceController,
  ...farmerController,
  ...userController,
  ...authController,
  ...distributorController,
};
