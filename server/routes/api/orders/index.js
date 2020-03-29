const express = require('express');
const validate = require('express-validation');

const controller = require('./controller');
const { getId } = require('./validation');

const routes = express.Router();

/**
 * GET /orders
 */
routes.route('/').get(controller.get);
routes.route('/:_id').get(validate(getId), controller.getId);

/**
 * PUT /orders
 */
// routes.route('/:_id').put(validate(getId), controller.putId);

module.exports = routes;