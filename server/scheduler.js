const schedule = require('node-schedule');

module.exports = async () => {
    if (process.env.NODE_ENV !== 'development' && process.env.CRON_SEAMPLE) {
        schedule.scheduleJob(process.env.CRON_SEAMPLE, async () => {
        });
    }
};