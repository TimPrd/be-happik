const passport = require('passport');
const Mailer = require('./Mailer');
const models = require('../../models/');
const { Op } = require('sequelize')

/**
 * @api {post} /surveys/validate/ Save a new survey and notify users.
 * @apiName Save new survey
 * @apiGroup Surveys
 *
 * @apiParam {String} author id of the current user who is creating this survey.
 * @apiParam {String} teams Names of all the concerned teams.
 * @apiParam {String} questions list of all the questions object (title, description, place).
 * @apiParam {String} author id of the current user who is creating this survey.
 *
 * @apiSuccess (204) {String} NoContent
 */
//todo : passport to check role & connexion
//todo : docs
exports.validate = async function (req, res) {
    const author = req.body.author;
    const teams = req.body.teams;
    const questions = req.body.questions;

    let survey = await models.Survey.create({
        title: req.body.surveyTitle,
        description: req.body.surveyDescription
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

    res.sendStatus(204);
};


/**
 * @api {get} /user/:id/surveys/ Get all the surveys that a user is related to.
 * @apiName Get related surveys for a specific user
 * @apiGroup User
 *
 * @apiSuccess (200) {Object} Surveys related surveys with basic infos (date, state, title..)
 * @apiError (400) {Number} 404 No user have been found
 */
//todo : add creator
//todo : logs
//todo : move to user ?
exports.getSurveyByUser = async function (req, res) {
    const userId = req.params.id;
    if (!userId)
        res.send("No user found").status(404);
    let user = await models.User.findById(userId);
    let surveys = await models.Teamsurvey.findAll({
            where: {TeamId: user.TeamId}
        }
    ).then(async surveys => {
        const ids = await surveys.map(s => s.SurveyId);
        return await models.Survey.findAll({
            where: {id: ids},
            attributes: ['title', 'startDate', 'open'/*, 'creator'*/]
        })
    }).catch(error => {
        res.send("An error occured, check logs").status(404);
    });
    res.send(surveys).status(200);
};
/*
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

}
;*/

/**
 * @api {get} /surveys/ Get all the surveys.
 * @apiName Save new survey
 * @apiGroup Surveys
 *
 * @apiParam {Number} page Query param to indicate the desired page .
 * @apiParam {String} state Query param to indicate the desired state (true=open/false=closed).
 *
 * @apiSuccess (200) {Object} page the desired page with surveys grouped by 9
 */
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
            res.sendStatus(404);
        });
};

/**
 * @api {get} /survey/:id Get information about a specific survey.
 * @apiName Get a specific survey
 * @apiGroup Surveys
 *
 * @apiSuccess (200) {Object} page the desired page with the survey
 */

exports.getSurvey =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (user) {
            const SurveyId = req.params.id;

            const userSurvey = await models.userSurvey.find({
                where:{
                    UserId:user.id,
                    SurveyId:SurveyId,
                },
                include:
                    [
                        {
                            model: models.Survey,
                            includes: [
                                {
                                    model:models.User
                                }
                            ]

                        }
                    ]
            });

            if (!userSurvey) {
                return res.json({msg: 'There is not survey for this id'});
            }

            const Author = await models.User.find({
                where:{
                    RoleId:0,
                    id:userSurvey.Survey.AuthorId
                },
                attributes: ['firstName','lastName']
            })

            const questionsSurvey = await models.Questionsurvey.findAll({
                where:{
                        SurveyId:userSurvey.SurveyId,
                    },
                include:[
                    {
                        model: models.Question,
                    },
                ]
                });

            let surv = userSurvey.Survey;

            async function setSurv(survey, userSurvey,Author, questionsSurvey){

                survey.AuthorId = undefined;
                return { survey: survey, author: Author, questions:  questionsSurvey.map(q => q.Question)};
            }

            const survey = await setSurv(surv, userSurvey, Author, questionsSurvey);

            return await res.json({msg: survey})
        }
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};

/**
 * @api {post} /survey/:idSurvey/answers Get all the surveys.
 * @apiName update results of a survey
 * @apiGroup Surveys
 *
 * @apiSuccess (200) {Object} page the desired page with the survey
 */

exports.postAnswers =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (user) {
            const SurveyId = req.params.idSurvey;

            const userSurvey = await models.userSurvey.find({
                where:{
                    UserId:user.id,
                    SurveyId:SurveyId,
                },
                include:
                    [
                        {
                            model: models.Survey,
                            where: {
                                open: true
                            }
                        }
                    ]
            });

            if (!userSurvey) {
                return res.json({msg: 'There is not survey for this id or this survey cannot be updated'});
            }

            const answers = await models.answer.findAll({
                where:{
                    UserId:userSurvey.UserId,
                    SurveyId:userSurvey.SurveyId,
                },
            });

            if (answers.length > 0) {
                return res.json({msg: 'You already answer this survey'})
            }

            const body = req.body;

            const questions  = body.map(body => body.questionId);

            const dd = await models.Questionsurvey.findAll({
                where: {
                    SurveyId: SurveyId
                }
            });

            if (dd.length !== questions.length) {
                return res.json({msg:'questions id or surveys id is not good'})
            }

            const jj = dd.map(d => d.QuestionId).sort();

            for (i = 0; i < jj.length; i++) {
                if (jj[i] !== questions[i]) {
                    return res.json({msg: 'questions id or surveys id is not good'})
                }
            }

            const answersBody = req.body;

            const results = answersBody
                .filter(ans => typeof (ans.result) === 'number' )
                .filter(ans => (0 <= ans.result &&  ans.result <= 100));



            if (results.length < 1 ) {
                return res.json({msg: 'Result should be a number between 0 and 100'} )
            }

            // return res.json({to: results});

            results.forEach(async result => {
                const answers = await models.answer.create({
                    result: result.result
                });
                answers.setSurvey(userSurvey.SurveyId);
                answers.setUser(userSurvey.UserId);
                answers.setQuestion(result.questionId);
                answers.save();
            });

            const notifications = await models.Notification.create({
                title: "New Answers !",
                body: "A survey have been answered",
                seen: false
            }).then(notif => {
                notif.setUser(userSurvey.Survey.AuthorId);
                notif.setSender(user.id);
            });

//var io = req.app.get('socketio');
            //var sockets = req.app.get('usersSocket');
            //sockets[1/*user.id*/]
            //.emit('hi!', "important notification message");
            return await res.json({msg: 'Your answers have been created'})
        }
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};

/**
 * @api {get} /survey/:id/answers Get information about a specific survey and questions/answers.
 * @apiName Get a specific survey
 * @apiGroup Surveys
 *
 * @apiSuccess (200) {Object} page the desired page with the survey
 */

exports.getSurveyWithAnswers =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (user) {
            let q = null;
            if (typeof req.query.q !== 'undefined') {
                q = parseInt(req.query.q);
            }

            const SurveyId = req.params.id;

            const userSurvey = await models.userSurvey.find({
                where:{
                    UserId:user.id,
                    SurveyId:SurveyId,
                },
                include:
                    [
                        {
                            model: models.Survey,
                        }
                    ]
            })

            if (!userSurvey) {
                return res.json({msg: 'There is not survey for this id'});
            }

            const answer = await models.answer.findAll({
                where:{
                    UserId:userSurvey.UserId,
                    SurveyId:userSurvey.SurveyId,
                },
                include:
                    [
                        {
                            model: models.Question,
                        },
                    ],
            });

            let surv = userSurvey.Survey;

            return await res.json({msg: {survey : surv, answer: answer}})
        }
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};

/**
 * @api {put} /survey/:idSurvey/answers Get all the surveys.
 * @apiName update results of a survey
 * @apiGroup Surveys
 *
 * @apiSuccess (200) {Object} page the desired page with the survey
 */

exports.putAnswers =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (user) {
            const SurveyId = req.params.idSurvey;

            const userSurvey = await models.userSurvey.find({
                where:{
                    UserId:user.id,
                    SurveyId:SurveyId,
                },
                include:
                    [
                        {
                            model: models.Survey,
                            where: {
                                open: true
                            }
                        }
                    ]
            });

            if (!userSurvey) {
                return res.json({msg: 'There is not survey for this id or this survey cannot be updated'});
            }

            const answersBody = req.body.answers;
            const answerIds = answersBody.map(answer => answer.id);

            const answers = await models.answer.findAll({
                where:{
                    UserId:userSurvey.UserId,
                    id:answerIds,
                    SurveyId:userSurvey.SurveyId,
                },
            });

            if (!answers) {
                return res.json({msg: "There is no answer with these ids"})
            }

            const results = answersBody
                .filter(ans => typeof (ans.result) === 'number' )
                .filter(ans => (0 <= ans.result &&  ans.result <= 100)  )
                .filter(ans => (answers
                    .map(a => a.id)
                    .includes(ans.id))
                );

            if (results.length < 1 ) {
                return res.json({msg: 'Result should be a number between 0 and 100'} )
            }

            results.forEach(async result => {
                await answers.forEach(async ans => {
                    await ans.update({result: result.result,where:{id:result.id}})
                })
            });

            return await res.json({msg: 'Your answers have been updated'})
        }
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};

/**
 * @api {put} /survey/:idSurvey/answer/:idAnswer Get all the surveys.
 * @apiName Get a specific survey
 * @apiGroup Surveys
 *
 * @apiSuccess (200) {Object} page the desired page with the survey
 */

exports.putAnswer =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (user) {
            const SurveyId = req.params.idSurvey;

            const userSurvey = await models.userSurvey.find({
                where:{
                    UserId:user.id,
                    SurveyId:SurveyId,
                },
                include:
                    [
                        {
                            model: models.Survey,
                            where: {
                                open: true
                            }
                        }
                    ]
            });

            if (!userSurvey) {
                return res.json({msg: 'There is not survey for this id or this survey cannot be updated'});
            }

            const answerId = req.params.idAnswer;

            const answer = await models.answer.find({
                where:{
                    UserId:userSurvey.UserId,
                    id:answerId,
                    SurveyId:userSurvey.SurveyId,
                },
            });

            let result;

            typeof(req.body.result) === 'number' ? result = req.body.result : result = null;

            if (result === null || (0 > result || result  > 100)) {
                return res.json({msg: 'Result should be a number between 0 and 100'})
            }

            await answer.update({result:result});

            return await res.json({msg: 'Your answer have been updated'})
        }
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};