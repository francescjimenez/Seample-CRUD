const httpStatus = require('http-status');
const mongoose = require('mongoose');
const UserSchema = require('./model');

const LIMIT_DOCUMENTS = 200;

exports.get = async (req, res, next) => {
    try {
        const users = await UserSchema.find({}).sort('created_at').limit(LIMIT_DOCUMENTS);

        if (!users) {
            throw new Error({
                message: 'Don\'t have users',
                status: httpStatus.BAD_REQUEST,
            });
        }

        res.status(httpStatus.OK).send(users);

    } catch (e) {
        next(e);
    }
};

exports.getOne = async (req, res, next) => {
    try {

        const {
            query: {
                created_at, from, to
            },
            params: { _id },
        } = req;
        const user = await UserSchema.findOne({
            _id
        });

        if (!user) {
            throw new Error({
                message: 'User is not available',
                status: httpStatus.BAD_REQUEST,
            });
        }

        res.status(httpStatus.OK).send(user);

    } catch (e) {
        next(e);
    }
};

exports.insert = async (req, res, next) => {
    try {

        const {
            body,
        } = req;

        const user = new UserSchema(body);
        const userResponse = await user.save();

        res.status(httpStatus.OK).send(userResponse);
    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.edit = async (req, res, next) => {
    try {

        const {
            body
        } = req;

        const user = await UserSchema.update({_id: body._id },body);

        res.status(httpStatus.OK).send(user);

    } catch (e) {
        console.log(e);
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    try {

        const {
            params: { _id },
        } = req;

        const user = await UserSchema.remove({
            _id
        });

        res.status(httpStatus.OK).send(user);

    } catch (e) {
        next(e);
    }
};