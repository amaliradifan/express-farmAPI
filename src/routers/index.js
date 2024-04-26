const express = require('express');

const movieRoutes = require('./farmer.routes');
const directorRoutes = require('./produce.routes');

const router = express.Router();

router.use('', movieRoutes);
router.use('', directorRoutes);

module.exports = router;
