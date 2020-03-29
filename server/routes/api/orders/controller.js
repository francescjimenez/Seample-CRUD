const httpStatus = require('http-status');
const mongoose = require('mongoose');
const OrdereSchema = require('./model');

const LIMIT_DOCUMENTS = 200; // 24 * 30;


exports.get = async (req, res, next) => {
    try {

        const performance = await OrdereSchema.find({}).sort('created_at').limit(LIMIT_DOCUMENTS);

        if (!performance) {
            throw new Error({
                message: 'Performance don\'t have reports',
                status: httpStatus.BAD_REQUEST,
            });
        }

        res.status(httpStatus.OK).send(performance);

    } catch (e) {
        next(e);
    }
};

exports.getId = async (req, res, next) => {
    try {
        const {
            query: {
                created_at, from, to
            },
            params: { _id },
        } = req;

        const performance = await PerformanceSchema.findOne({
            _id
        });

        if (!performance) {
            throw new Error({
                message: 'Order is not available',
                status: httpStatus.BAD_REQUEST,
            });
        }

        res.status(httpStatus.OK).send(performance);

    } catch (e) {
        next(e);
    }
};