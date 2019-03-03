const CronJob = require('cron').CronJob;
const models = require('../../models/');
const {Op} = require('sequelize');

exports.updateSurveyStatus = function () {
    const job = new CronJob('00 00 00 * * *', async function () {
        const d = new Date();
        await models.Survey.update({
            status: 'expired'
        }, {where: {endDate: {[Op.lte]: d}}})
    });
    console.log('Job ready to run tonight');
    job.start();
};
