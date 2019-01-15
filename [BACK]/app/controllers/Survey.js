const Mailer = require('./Mailer');
const models = require('../../models/');


exports.validate = async function (req, res) {
    const author = req.body.author;
    const teams = req.body.teams;
    const questions = req.body.questions;


    let survey = await models.Survey.create({
        title: req.body.surveyTitle,
    }).then(survey => {
        survey.setAuthor(author)
        return survey;
    });

    await questions.forEach(async question => {
        await models.Question.create({
            title: question.title,
            description: question.description,
        }).then(async createdQuestion => {
            await models.Questionsurvey.create({
                place: question.place
            }).then(questionSurvey => {
                questionSurvey.setSurvey(survey.id);
                questionSurvey.setQuestion(createdQuestion.id);
            });
        });
    });

    const idTeams = await models.Team.findAll({where: {teamName: teams}});
    idTeams.forEach(async idTeam => {
        let users = await models.User.findAll({where: {TeamId: idTeam.id}});
        users.forEach(async user => {
            const datas = {
                email: user.email,
            };
            //Mailer.send(user.email, 'd-0ea007d61f4a415a8dfc8ebc143e759e', datas);
            //await models.UserSurvey.create({
            //generate id survey
            //
            //}).then(usersurvey => {
            //    usersurvey.setUser(user.id);
            //});
            await models.Notification.create({
                title: "New Survey !",
                body: "A new survey is available",
                seen: false
            }).then(notif => {
                notif.setUser(user.id);
                notif.setSender(author);
            });

            //var io = req.app.get('socketio');
            //var sockets = req.app.get('usersSocket');
            //sockets[1/*user.id*/]
            //.emit('hi!', "important notification message");

        });
    });

    res.sendStatus(201);
};


exports.getSurveyByUser = async function (req, res) {
    const userId = req.params.id;
    await models.Survey.findAll({where: {userId: userId}}) //todo check where

};


exports.getAll = async function (req, res) {
    let limit = 9;   // number of records per page
    let offset = 0;
    models.Survey.findAndCountAll()
        .then((data) => {
            let pages = Math.ceil(data.count / limit);
            offset = limit * (req.query.page - 1);
            models.Survey.findAll({
                where: {state: res.query.state},
                limit: limit,
                offset: offset,
                $sort: {id: 1}
            })
                .then((surveys) => {
                    res.status(200).json({'result': surveys, 'count': data.count, 'pages': pages});
                });
        })
        .catch(function (error) {
            res.sendStatus(500);
        });
};
