const models = require('../../models/');
const {loggers} = require('winston');
const logger = loggers.get('my-logger');
const passport = require('passport');
const Mood = require('./Mood');
const Sequelize = require('sequelize');

/**
 * @api {get} /analytic/mood Return the mood of all the teams of the manager between date and date - 7 days (must be manager).
 * @apiName Analytic mood stat for every user in manager teams
 * @apiGroup Analytic
 * @apiParam {String} date  current date ("2019-02-31") -> deal with jet-lag.
 *
 * @apiSuccess (200) {Object} stat Object with stats.
 */
exports.moodPerWeek = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            //toString().split(' ')[0]; => get Mon, Tues, Wed
            if (user && user.RoleId === 1) {
                let endDate = new Date(req.body.date.split("-").join(","));
                let startDate = new Date(req.body.date.split("-").join(","));
                startDate.setDate(startDate.getDate() - 7);
                //todo : change into a include
                let teams = await models.Team.findAndCountAll({
                    where: {
                        UserId: user.id,

                    },
                });
                let moods = await models.userMood.findAll({
                    where: {
                        createdAt: {$between: [startDate, endDate]},
                    },
                    include: [{
                        model: models.User,
                        where: {
                            TeamId: teams.rows.map((item) => {
                                return item["id"];
                            })
                        }
                    }]
                });
                let groups = {};
                moods.forEach((item) => {
                    let list = groups[item.createdAt];
                    if (list) {
                        list.push(item.mood);
                    } else {
                        groups[item.createdAt] = [item.mood];
                    }
                });
                let datas = [];
                for (let date in groups) {
                    let counts = {};
                    Mood.MOODS.forEach(mood => {
                        counts[mood] = 0;
                    });
                    for (let i = 0; i < groups[date].length; i++) {
                        counts[groups[date][i]] = counts[groups[date][i]] ? counts[groups[date][i]] + 1 : 1;
                    }
                    datas.push({data: /*Object.values(counts)*/counts, date: date})
                }
                return res.status(200).json(datas);
            } else {
                return res.status(400).json({msg:"You are not authorize"});
            }
        }
    )
    (req, res);
};

/**
 * @api {get} /analytic/count/ Return the differents stat about teams (count - collaborators, teams, surveys, notifications) (must be manager).
 * @apiName Analytic Count datas
 * @apiGroup Analytic
 *
 * @apiSuccess (200) {Object} stat Object with stats of surveys count.
 */
exports.counts = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (user && user.RoleId === 1) {
                let teams = await models.Team.findAndCountAll({
                    where: {
                        UserId: user.id,
                    },
                });
                let users = await models.User.findAndCountAll({
                    where: {
                        TeamId: teams.rows.map((item) => {
                            return item["id"];
                        }),
                    }
                });
                let surveys = await models.Survey.findAndCountAll({
                    where: {
                        AuthorId: user.id,
                        open: true
                    }
                });
                let notifications = await models.Notification.findAndCountAll({
                    where: {
                        UserId: user.id,
                        seen: false
                    }
                });

                let json = {
                    teams: {
                        count: teams.count,
                        datas: teams.rows
                    },
                    collaborators: {
                        count: users.count,
                        datas: users.rows
                    },
                    surveys: {
                        count: surveys.count,
                        datas: surveys.rows
                    },
                    notifications: {
                        count: notifications.count,
                        datas: notifications.rows
                    }

                };
                return res.status(200).send(json);
            } else {
                return res.status(400).json({msg:"You are not authorize"});
            }
        }
    )
    (req, res);
};

/**
 * @api {get} /analytic/survey/response Return the number of responses (response / no response yet) (must be manager).
 * @apiName Analytic number of response for a survey
 * @apiGroup Analytic
 *
 * @apiSuccess (200) {Object} stat Object with stats of surveys number of responses / not yet.
 */
exports.surveyResponse = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (user && user.RoleId === 1) {

                let surveys = await models.userSurvey.findAll({
                    where: {
                        SurveyId: 1,
                    },
                    attributes: ['isAnswered', [Sequelize.fn('count', 'isAnswered'), 'count']],
                    group: ['isAnswered']
                });

                return res.status(200).send(surveys);
            } else {
                return res.status(400).json({msg:"You are not authorize"});
            }
        }
    )
    (req, res);
};

/**
 * @api {get} /analytic/survey/status Return if the number of open / closed survey managed by the current user (must be manager).
 * @apiName Analytic open/closed survey
 * @apiGroup Analytic
 *
 * @apiSuccess (200) {Object} stat Object with stats of surveys open / closed .
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  "open": false,
 *  "count": "1"
 * },
 * {
 *  "open": true,
 *  "count": "7"
 * }
 */
exports.surveyStatus = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (user && user.RoleId === 1) {

                let surveys = await models.Survey.findAll({
                    where: {
                        AuthorId: 9,
                    },
                    attributes: ['open', [Sequelize.fn('count', 'open'), 'count']],
                    group: ['open']
                });
                return res.status(200).send(surveys);
            } else {
                return res.status(400).json({msg:"You are not authorize"});
            }
        }
    )
    (req, res);
};
