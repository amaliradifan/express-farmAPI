const produceController = require('./produce.controller');
const farmerController = require('./farmer.controller');

module.exports = { ...produceController, ...farmerController };
