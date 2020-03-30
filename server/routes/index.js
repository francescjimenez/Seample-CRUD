const express = require('express');

const Api = require('./api');
const Web = require('./web');

const router = express.Router();

/**
 * GET /status
 */
router.get('/ping', (req, res) => res.send('pong'));

/**
 * GET /api
 */
router.use('/api', Api);

/**
 * GET /
 */
router.use('/', Web);


module.exports = router;