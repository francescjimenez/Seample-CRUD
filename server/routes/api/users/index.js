const express = require('express');
const validate = require('express-validation');

const controller = require('./controller');
const { idValidation, userValidation } = require('./validation');

const routes = express.Router();

/**
 * GET /users
 */
routes.route('/').get(controller.get);
routes.route('/:_id').get(validate(idValidation), controller.getOne);

/**
 * POST /users
 */
routes.route('/').post(validate(userValidation), controller.insert);


/**
 * PUT /users
 */
routes.route('/:_id').patch(validate(userValidation), controller.edit);

/**
 * DELETE /users
 */
routes.route('/:_id').delete(validate(idValidation), controller.delete);


module.exports = routes;