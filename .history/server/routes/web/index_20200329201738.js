const express = require('express');
const { frontendRoot } = require('../../config');
const router = express.Router();


/**
 * GET / all pages
 */
router.get('/:page/:id', (req, res) => res.sendFile(frontendRoot+'/index.html'));
router.get('/:page/:id', (req, res) => res.sendFile(frontendRoot+'/index.html'));

module.exports = router;