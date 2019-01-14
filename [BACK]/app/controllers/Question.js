const models = require('../../models/');

exports.getPredefined = function (req, res) {
    let q = 0;
    if (typeof req.query.q !== 'undefined') {
        q = parseInt(req.query.q);
    }
    models.Question.findAll({
        where:{
            predefined:true
        },
        limit:q,
    }).then(data => {
        const questions = data.map(question => question.title);
        res.send(questions);
    } )
}
