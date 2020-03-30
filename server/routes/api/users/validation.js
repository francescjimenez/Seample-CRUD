const Joi = require('joi');

module.exports = {
    idValidation: {
        params: {
            _id: Joi.string().required()
        }
    },
    userValidation: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string()
        }
    },
};