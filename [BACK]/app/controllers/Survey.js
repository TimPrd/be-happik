const passport = require('passport');
const Mailer = require('./Mailer');
const models = require('../../models/');
const {Op} = require('sequelize');
const _ = require('lodash');
const {loggers} = require('winston');
const logger = loggers.get('my-logger');
/**
 * @api {post} /surveys/validate/ Save a new survey and notify users.
 * @apiName Save new survey
 * @apiGroup Surveys
 *
 * @apiParam {String} author id of the current user who is creating this survey.
 * @apiParam {Number[]} teams ids of all the concerned teams.
 * @apiParam {Object} questions list of all the questions object (title, description, place).
 * @apiParam {String} author id of the current user who is creating this survey.
 * @apiParam {String} surveyTitle Title of the survey.
 * @apiParam {String} surveyDescription Description of the survey.
 * @apiParam {String} endDate Date limit. If not set = Now + 15 days (format : "1997-02-10")
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "author":"144",
 *      "teams":[2,1],
 *      "questions": [
 *          {"title":"Q1", "body":"Body1","place":1},
 *          {"title":"Q2", "body": "Body2", "place": 2}
 *      ],
 *      "surveyTitle":"MySurvey",
 *      "surveyDescription":"MyDescription"
 *  }
 * @apiSuccess (204) {String} NoContent
 */
//todo : passport to check role & connexion (manager)
//todo : docs
exports.validate = async function (req, res) {
    const author = req.body.author;
    const teams = req.body.teams;
    const questions = req.body.questions;
    if (!_.isEmpty(req.body.author) && !_.isEmpty(req.body.surveyTitle) && !_.isEmpty(req.body.surveyDescription)) {
        logger.debug(_.isEmpty(req.body.surveyTitle));
        let survey = await models.Survey.create({
            title: req.body.surveyTitle,
            description: req.body.surveyDescription,
            startDate: new Date(),
            open: true,
            endDate: req.body.endDate ? new Date(req.body.endDate.split("-").join(",")) : new Date(new Date().getTime() + (15 * 24 * 60 * 60 * 1000))
        });
        survey.setAuthor(author);
        await questions.forEach(async question => {
            let createdQuestion = await models.Question.create({
                title: question.title,
                description: question.description,
            });
            let questionSurvey = await models.Questionsurvey.create({
                place: question.place
            });
            questionSurvey.setSurvey(survey.id);
            questionSurvey.setQuestion(createdQuestion.id);
        });

        const idTeams = await models.Team.findAll({
            where: {id: teams}
        });
        idTeams.forEach(async idTeam => {
            logger.debug(idTeam.id);
            let users = await models.User.findAll({where: {TeamId: idTeam.id}});
            users.forEach(async user => {
                const datas = {
                    email: user.email,
                };
                logger.debug(user.email);
                //Mailer.send(user.email, 'd-0ea007d61f4a415a8dfc8ebc143e759e', datas);
                //let usersurvey = await models.UserSurvey.create({
                //generate id survey
                //
                //})
                //usersurvey.setUser(user.id);
                //
                let notif = await models.Notification.create({
                    title: "New Survey !",
                    body: "A new survey is available",
                    seen: false
                });
                notif.setUser(user.id);
                notif.setSender(author);
                var socket = req.app.get('usersSocket');
                socket[user.id/*user.id*/].emit('notification', "important notification for U <3 ");

                //var io = req.app.get('socketio');
                //var sockets = req.app.get('usersSocket');
                //sockets[1/*user.id*/]
                //.emit('hi!', "important notification message");

            });
        });
        res.status(204).json("Your survey have been created !");
    } else {
        res.status(409).json("Something went wrong with form data");
    }
}
;


/**
 * @api {get} /surveys/user/:idUser Get all the surveys that a user is related to.
 * @apiName Get related surveys for a specific user
 * @apiGroup User
 *
 * @apiSuccess (200) {Object[]} surveys related surveys with basic infos
 * @apiSuccess (200) {Number} surveys.id id of the survey
 * @apiSuccess (200) {String} surveys.title title of the survey
 * @apiSuccess (200) {String} surveys.description description of the survey
 * @apiSuccess (200) {Date} surveys.startDate starting date of the survey
 * @apiSuccess (200) {Date} surveys.endDate ending date of the survey
 * @apiSuccess (200) {Boolean} surveys.open Status to know if the survey is open or not
 * @apiSuccess (200) {Date} surveys.createdAt creating date of the survey
 * @apiSuccess (200) {Date} surveys.updatedAt updated date of the survey
 * @apiSuccess (200) {Number} surveys.AuthorId id of the author fot the survey
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
            "id": 9,
            "title": "Regional Intranet Developer",
            "description": null,
            "startDate": "2019-02-16T13:03:51.242Z",
            "endDate": "2019-03-03T13:03:51.242Z",
            "open": true,
            "createdAt": "2019-02-16T13:03:51.242Z",
            "updatedAt": "2019-02-16T13:03:51.242Z",
            "AuthorId": 1
        },
        {
            "id": 12,
            "title": "Internal Solutions Planner",
            "description": null,
            "startDate": "2019-02-16T13:03:51.242Z",
            "endDate": "2019-03-03T13:03:51.242Z",
            "open": true,
            "createdAt": "2019-02-16T13:03:51.242Z",
            "updatedAt": "2019-02-16T13:03:51.242Z",
            "AuthorId": 1
        },
        {
            "id": 13,
            "title": "Product Group Facilitator",
            "description": null,
            "startDate": "2019-02-16T13:03:51.242Z",
            "endDate": "2019-03-03T13:03:51.242Z",
            "open": true,
            "createdAt": "2019-02-16T13:03:51.242Z",
            "updatedAt": "2019-02-16T13:03:51.242Z",
            "AuthorId": 1
        }
 *     ]
 *
 * @apiError (400) {Number} 404 No user have been found
 */
//todo : add creator
//todo : logs
//todo : move to user ?
exports.getSurveysByUser = async function (req, res) {
    const userId = req.params.idUser;
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
        })
    }).catch(error => {
        res.send("An error occured, check logs").status(404);
    });
    res.send(surveys).status(200);
};

/**
 * @api {get} /surveys Get all the surveys.
 * @apiName Get all survey with 9 surveys limit
 * @apiGroup Surveys
 *
 * @apiParam {Number} page Query param to indicate the desired page .
 * @apiParam {Boolean} open Query param to indicate the desired state (true=open/false=closed).
 *
 * @apiExample Example usage:
 * http://localhost/surveys?page=1&open=true
 *
 * @apiSuccess (200) {Object[]} surveys All the survey
 * @apiSuccess (200) {Number} surveys.id id of the survey
 * @apiSuccess (200) {String} surveys.title Title of the survey
 * @apiSuccess (200) {String} surveys.description Description of the survey
 * @apiSuccess (200) {String} surveys.startDate Starting date of the survey
 * @apiSuccess (200) {String} surveys.endDate Ending Date of the survey
 * @apiSuccess (200) {Boolean} surveys.open Status to know if the survey is opened or not
 * @apiSuccess (200) {Number} surveys.AuthorId Id of the survey author
 * @apiSuccess (200) {Number} count The number of all surveys
 * @apiSuccess (200) {Number} page The total number of pages
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "surveys": [
        {
          "id": 11,
          "title": "Dynamic Assurance Supervisor",
          "description": null,
          "startDate": "2019-02-16T13:03:51.242Z",
          "endDate": "2019-03-03T13:03:51.242Z",
          "open": true,
          "createdAt": "2019-02-16T13:03:51.242Z",
          "updatedAt": "2019-02-16T13:03:51.242Z",
          "AuthorId": 13
        },
        {
          "id": 12,
          "title": "Internal Solutions Planner",
          "description": null,
          "startDate": "2019-02-16T13:03:51.242Z",
          "endDate": "2019-03-03T13:03:51.242Z",
          "open": true,
          "createdAt": "2019-02-16T13:03:51.242Z",
          "updatedAt": "2019-02-16T13:03:51.242Z",
          "AuthorId": 1
        },
        {
          "id": 13,
          "title": "Product Group Facilitator",
          "description": null,
          "startDate": "2019-02-16T13:03:51.242Z",
          "endDate": "2019-03-03T13:03:51.242Z",
          "open": true,
          "createdAt": "2019-02-16T13:03:51.242Z",
          "updatedAt": "2019-02-16T13:03:51.242Z",
          "AuthorId": 1
        }
       ],
      "count": 9,
      "pages": 1

 *     }
 *
 * @apiError {String} SurveyNotFound There is no surveys
 * @apiError {String} WrongParams Please specify a state and page
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *         "There is no surveys"
 *     }
 */
exports.getAllSurveys = async function (req, res) {

    if (typeof req.query.open === 'undefined' ||  typeof req.query.page === 'undefined') {
        res.status(400).json("Please specify a state (open param) and page");
    }

    let limit = 9;   // number of records per page
    let offset = limit * (req.query.page - 1);
    let surveys = await models.Survey.findAll({
        where: {open: req.query.open},
        limit: limit,
        offset: offset,
        $sort: {id: 1}
    });

    if (surveys.length < 1) {
        res.status(404).json("There is no surveys");
    }

    const count = surveys.length;
    const pages = Math.ceil(count / limit);
    surveys = surveys.slice(0,limit)

    res.status(200).json({'surveys': surveys, 'count': count, 'pages': pages});
};

/**
 * @api {get} /survey/:idSurvey Get information about a specific survey.
 * @apiName Get a specific survey
 * @apiGroup Surveys
 *
 * @apiSuccess (200) {Object} survey The survey you asked
 * @apiSuccess (200) {Number} survey.id id of the survey
 * @apiSuccess (200) {String} survey.title Title of the survey
 * @apiSuccess (200) {String} survey.description Description of the survey
 * @apiSuccess (200) {String} survey.startDate Starting date of the survey
 * @apiSuccess (200) {String} survey.endDate Ending Date of the survey
 * @apiSuccess (200) {Boolean} survey.open Status to know if the survey is opened or not
 * @apiSuccess (200) {String} author Author of the survey
 * @apiSuccess (200) {Object[]} questions Questions of a survey
 * @apiSuccess (200) {Number} questions.id id of the question
 * @apiSuccess (200) {String} questions.title Title of the question
 * @apiSuccess (200) {String} questions.description Description of the question
 * @apiSuccess (200) {Boolean} questions.predefined Status to know if the question is predefined or not
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "survey": {"id": 1,"title": "Measure of happiness", "description": We want the best for you. That's why we want to know if you are happy,
 *                  "startDate":"2019-02-16T13:03:51.241Z","endDate":"2019-03-16T13:03:51.241Z", "open":true},
 *       "author": Jacques Chirac,
 *       "questions": [
 *          {"id": 54,"title": "Principal Infrastructure Coordinator","description": "Dicta voluptatem voluptate nisi culpa et doloribus magni.","predefined": false},
 *          {"id": 70,"title": "Corporate Directives Developer","description": "Reiciendis aut vitae velit fugit sit totam omnis.","predefined": false},
 *          {"id": 95,"title": "Principal Identity Technician","description": "Vero maiores fugiat hic sequi et voluptatibus molestiae.","predefined": false}
 *       ]
 *     }
 *
 * @apiError (400) There is no survey for this id
 * @apiError (401) UserNotFound You are not authorized
 */

exports.getSurvey = function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (user) {
            const SurveyId = req.params.idSurvey;

            const userSurvey = await models.userSurvey.find({
                where: {
                    UserId: user.id,
                    SurveyId: SurveyId,
                },
                include:
                    [
                        {
                            model: models.Survey,
                            includes: [
                                {
                                    model: models.User
                                }
                            ]

                        }
                    ]
            });

            if (!userSurvey) {
                return res.status(400).json('There is not survey for this id');
            }

            const Author = await models.User.find({
                where: {
                    RoleId: 0,
                    id: userSurvey.Survey.AuthorId
                },
                attributes: ['firstName', 'lastName']
            });

            const questionsSurvey = await models.Questionsurvey.findAll({
                where: {
                    SurveyId: userSurvey.SurveyId,
                },
                include: [
                    {
                        model: models.Question,
                    },
                ]
            });

            let surv = userSurvey.Survey;

            async function setSurv(survey, userSurvey, Author, questionsSurvey) {

                survey.AuthorId = undefined;
                return {survey: survey, author: Author, questions: questionsSurvey.map(q => q.Question)};
            }

            const survey = await setSurv(surv, userSurvey, Author, questionsSurvey);

            return await res.status(200).json(survey)
        } else
            return res.status(401).json("You are not authorize");
    })(req, res);
};

/**
 * @api {get} /survey/:idSurvey/answers Get information about a specific survey and questions/answers.
 * @apiName Get a specific survey
 * @apiGroup Surveys
 *
 * @apiSuccess (200) {Object} survey the survey you asked survey
 * @apiSuccess (200) {Object} survey.id id of the survey
 * @apiSuccess (200) {Object} survey the survey you asked survey
 * @apiSuccess (200) {Object} survey the survey you asked survey
 * @apiSuccess (200) {Object[]} answers Array of answers
 * @apiSuccess (200) {Number} answers.id id of the answer
 * @apiSuccess (200) {Number} answers.result Result of the answer
 * @apiSuccess (200) {Object} answers.Question Question of the answer
 * @apiSuccess (200) {Number} answers.Question.id Id of the question
 * @apiSuccess (200) {String} answers.Question.title Title of the question
 * @apiSuccess (200) {String} answers.Question.description Description of the question
 * @apiSuccess (200) {Boolean} answers.Question.predefined Status indicates if the question is predefined or not
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "survey": {"id": 1,"title": "Measure of happiness", "description": We want the best for you. That's why we want to know if you are happy},
 *       "answers": [
 *           {"id":4,"result":100,"UserId":1,
 *           "Question":
 *              {"id":1,"title":"Are you happy today ?","description":"We want to know if you are happy.","predefined":false,}
 *           },
 *           {"id":5,"result":25,"UserId":1,
 *           "Question":{"id":3,"title":"Do you like your desk ?","description":"We want to know if like your chair.","predefined":yes,}
 *           }
 *       ]
 *     }
 *
 * @apiError (401) {String} UserNotFound You are not authenticated
 * @apiError (500) {Number} AuthenticateError Server can't authenticate you
 */

exports.getSurveyWithAnswers = function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (user) {
            let q = null;
            if (typeof req.query.q !== 'undefined') {
                q = parseInt(req.query.q);
            }

            const SurveyId = req.params.idSurvey;

            const userSurvey = await models.userSurvey.find({
                where: {
                    UserId: user.id,
                    SurveyId: SurveyId,
                },
                include:
                    [
                        {
                            model: models.Survey,
                        }
                    ]
            });

            if (!userSurvey) {
                return res.status(400).json('There is not survey for this id');
            }

            const answer = await models.answer.findAll({
                where: {
                    UserId: userSurvey.UserId,
                    SurveyId: userSurvey.SurveyId,
                },
                include:
                    [
                        {
                            model: models.Question,
                        },
                    ],
            });

            let surv = userSurvey.Survey;

            return await res.status(200).json({survey: surv, answers: answer})
        } else
            return res.sendStatus(401);
    })(req, res);
};

/**
 * @api {post} /survey/:idSurvey/answers Send answsers for a survey with a POST methodd.
 * @apiName Add answers for a survey
 * @apiGroup Surveys
 * @apiGroup Answers
 *
 * @apiParam {Object[]} answers Answers array.
 * @apiParam {Number} answers.questionId Id of the question you want to answer.
 * @apiParam {Number} answers.result Result of the answer for a specific question. This need to be an integer between 0 and 100 (possible values = 0, 25, 50, 75, 100)
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "answers":[
 *          {"questionId:1,result:50"},
 *          {"questionId:3,result:100"},
 *          {"questionId:7,result:0"}
 *      ]
 *  }
 *
 * @apiSuccess (200) {String} Your answers have been created
 * @apiError {String} UserNotFound are not authorize
 * @apiError {String} SurveyNotFound There is not survey for this id or this survey cannot be updated
 * @apiError {String} WrongValue Answers format is not good.
 * @apiError {String} WrongValue You must add answers
 * @apiError {String} AlreadySend You already answer this survey
 * @apiError {String} QuestionNotFound Questions id or surveys id is not good
 * @apiError {String } WrongValue Result should be a number between 0 and 100
 * @apiError (500) {String} AuthenticationError Server can't authenticate you
 */

exports.postAnswers =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.send(500).send(err);
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
                return res.status(400).json('There is not survey for this id or this survey cannot be updated');
            }

            if (Array.isArray(req.body.answers) === false) {
                return res.status(400).json('Answers format is not good.');
            } else if (typeof req.body.answers[0] === "undefined") {
                return res.status(400).json('You must add answers. ');
            }

            let answersBody = req.body.answers;
            const answerIds = answersBody.map(answer => answer.id);

            const answers = await models.answer.findAll({
                where:{
                    UserId:userSurvey.UserId,
                    SurveyId:userSurvey.SurveyId,
                },
            });

            if (answers.length > 0) {
                return res.status(409).json('You already answer this survey')
            }

            const body = req.body;

            const questions  = body.map(body => body.questionId);

            const dd = await models.Questionsurvey.findAll({
                where: {
                    SurveyId: SurveyId
                }
            });

            if (dd.length !== questions.length) {
                return res.status(400).json('Questions id or surveys id is not good')
            }

            const jj = dd.map(d => d.QuestionId).sort();

            for (i = 0; i < jj.length; i++) {
                if (jj[i] !== questions[i]) {
                    return res.status(400).json('Questions id or surveys id is not good')
                }
            }

            answersBody = req.body;

            const results = answersBody
                .filter(ans => typeof (ans.result) === 'number' )
                .filter(ans => (0 <= ans.result &&  ans.result <= 100));

            if (results.length < 1 ) {
                return res.status(400).json('Result should be a number between 0 and 100')
            }

            results.forEach(async result => {
                const answers = await models.answer.create({
                    result: result.result
                });
                answers.setSurvey(userSurvey.SurveyId);
                answers.setUser(userSurvey.UserId);
                answers.setQuestion(result.questionId);
                answers.save();
            });

            // Todo Make socket works
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

            userSurvey.update({
                isAnswered: true
            });
            return await res.status(200).json('Your answers have been created')
        }
        else
            return res.status(401).json("You are not authorize");
    })(req, res);
};

/**
 * @api {put} /survey/:idSurvey/answers Get all the surveys.
 * @apiName Update answers of a survey
 * @apiGroup Surveys
 *
 * @apiParam {Object[]} answers Answers array.
 * @apiParam {Number} id Id of the answer you want to answer.
 * @apiParam {Number} result Result of the answer for a specific question. This need to be an integer between 0 and 100 (possible values = 0, 25, 50, 75, 100)
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *      "answers":[
 *          {"id:5,result:100"},
 *          {"id:8,result:0"},
 *          {"id:12,result:25"}
 *      ]
 *  }
 *
 * @apiSuccess (200) {String} Your answers have been updated
 * @apiError {String} UserNotFound You are not authorized
 * @apiError {String} SurveyNotFound There is not survey for this id or this survey cannot be updated
 * @apiError {String} WrongValue Result should be a number between 0 and 100 and ids must match the survey answers
 * @apiError {String} AnswersNotFound There is no answer with these ids

 */

exports.putAnswers = function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (user) {
            const SurveyId = req.params.idSurvey;

            const userSurvey = await models.userSurvey.find({
                where: {
                    UserId: user.id,
                    SurveyId: SurveyId,
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
                return res.status(400).json('There is not survey for this id or this survey cannot be updated');
            }

            const answersBody = req.body.answers;
            const answerIds = answersBody.map(answer => answer.id);

            const answers = await models.answer.findAll({
                where: {
                    UserId: userSurvey.UserId,
                    id: answerIds,
                    SurveyId: userSurvey.SurveyId,
                },
            });

            if (!answers) {
                return res.status(400).json("There is no answer with these id")
            }

            const results = answersBody
                .filter(ans => typeof (ans.result) === 'number')
                .filter(ans => (0 <= ans.result && ans.result <= 100))
                .filter(ans => (answers
                    .map(a => a.id)
                    .includes(ans.id))
                );

            if (results.length < 1 ) {
                return res.status(400).json('Result should be a number between 0 and 100 and ids must match the survey answers')
            }

            results.forEach(async result => {
                await answers.forEach(async ans => {
                    await ans.update({result: result.result, where: {id: result.id}})
                })
            });

            return await res.status(200).json('Your answers have been updated')
        } else
            return res.status(401).json("You are not authorize");
    })(req, res);
};

