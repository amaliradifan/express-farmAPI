const express = require('express');

const farmerRoutes = require('./farmer.routes');
const distributorRoutes = require('./distributor.routes');
const produceRoutes = require('./produce.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('', farmerRoutes);
router.use('', distributorRoutes);
router.use('', produceRoutes);
router.use('', userRoutes);
router.use('', authRoutes);

module.exports = router;
