const mongoose = require('mongoose');

const roundMinutesHour = (time) => {
    var timeToReturn = new Date(time);

    timeToReturn.setMilliseconds(Math.round(timeToReturn.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    // timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
    timeToReturn.setMinutes(0);

    return timeToReturn.getTime();
};

/**
 * User Schema
 * @private
 */
const UserSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    gender: {
        type: String,
    },
    first_name: {
        type: String
    },
    last_name: { 
        type: String
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    location: {
        state: { type: String},
        city: { type: String},
        street: { type: String},
        postcode: { type: String},
    },
    created_at: {
        default: Date.now,
        type: Number,
        //unique : true,
        //dropDups: true,
        get: v => roundMinutesHour(v),
        set: v => roundMinutesHour(v)
    },
});


/**
 * Add
 * - pre-save hooks
 * - validations
 * - victuals
 */
UserSchema.pre('save', async () => {});

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {};

/**
 * @typedef UserSchema
 */

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;