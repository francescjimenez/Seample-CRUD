const express = require('express');

const Users = require('./users');

const router = express.Router();

router.get('/', (req, res) => res.send({
    'users': 'api/users'
}));

/**
 * GET /api
 */
router.use('/users', Users);

module.exports = router;