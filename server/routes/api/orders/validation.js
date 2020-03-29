const Joi = require('joi');

module.exports = {
    getId: {
        params: {
            _id: Joi.string().required()
        }
    },
};