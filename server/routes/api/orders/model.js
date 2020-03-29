const mongoose = require('mongoose');

/**
 * Order Schema
 * @private
 */
const OrderSchema = new mongoose.Schema({
    created_at: {
        default: Date.now,
        type: Number,
        //unique : true,
        //dropDups: true,
        get: v => roundMinutesHour(v),
        set: v => roundMinutesHour(v)
    },
    url: {
        type: String,
    },
    server_time: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    speed_index: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    avg_document_interactive: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    first_contentful_paint: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    first_cpu_idle: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    max_potential_fid: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    total_blocking_time: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    estimated_input_latency: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    performance: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    accessibility: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    best_practices: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    seo: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },

});


/**
 * Add
 * - pre-save hooks
 * - validations
 * - victuals
 */
OrderSchema.pre('save', async () => {});

/**
 * Methods
 */
OrderSchema.method({});

/**
 * Statics
 */
OrderSchema.statics = {};

/**
 * @typedef OrderSchema
 */

const model = mongoose.model('OrderSchema', OrderSchema);

module.exports = model;