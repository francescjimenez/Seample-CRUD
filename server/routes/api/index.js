const express = require('express');

const Orders = require('./orders');

const router = express.Router();

router.get('/', (req, res) => res.send({
    'orders': 'api/orders'
}));

/**
 * GET /api
 */
router.use('/orders', Orders);

module.exports = router;