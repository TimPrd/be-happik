const models = require('../../models/');

/**
 * @api {get} /question/predefined/ Get all the predefined questions.
 * @apiName Predefined questions
 * @apiGroup Questions
 *
 * @apiParam {String} q number of questions to fetch.
 *
 * @apiSuccess (200) {String} predefined questions fetched
 */
//todo: req.query shouln't be an int ?
exports.getPredefined = function (req, res) {
    let q = 0;
    if (typeof req.query.q !== 'undefined') {
        q = parseInt(req.query.q);
    }

    models.Question.findAll({
        where: {
            predefined: true
        },
        limit: q,
    }).then(data => {
        const questions = data.map(question => question.title);
        res.send(questions).status(200);
    })
}
