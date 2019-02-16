const jwt = require('jsonwebtoken');
const passport = require('passport');
const models = require('../../models/');
const Utils = require('./Utils');
const bcrypt = require('bcrypt-nodejs');
const Mailer = require('./Mailer');
const { loggers } = require('winston')
const logger = loggers.get('my-logger')


/**
 * @api {post} /user/register Register users.
 * @apiName Register User
 * @apiGroup User
 *
 * @apiParam {String[]} email users email.
 * @apiParam {String} team the team that user will join.
 * @apiParam {Number} currentUserId ID of the current user who register.
 */
exports.register = async function (req, res) {
    const rawEmails = req.body.email;
    const rawteam = req.body.team;
    const currentUser = req.body.currentUserId;

    const sortedEmail = [...new Set(rawEmails.filter(x => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)))];
    let users = [];
    let team = await models.Team.findOne({where: {teamName: rawteam}});

    sortedEmail.forEach(async function (mail) {
        const token = require('crypto').randomBytes(10).toString('hex');
        console.log("token : ", token)
        models.User.findOne({
            where: {id: currentUser, RoleId: 0}
        }).then(async currentUsr => {
            if (currentUsr) {
                console.log("current : ", currentUsr)
                await models.User.find({
                    where: {email: mail, isRegistered: false}
                }).then(async user => {
                    if (!user) {
                        console.log("usr : ", user)
                        await models.User.create({
                            email: mail,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }).then(async created => {
                            created.setTeam(team.id);
                            models.Recovery.create({
                                token: token,
                                destroyable: false,
                            }).then(recovery => {
                                return recovery.setUser(created.id)
                            })
                        });
                    }
                }).catch(error => {
                    console.log(error)// Ooops, do some error-handling
                });
            }
        });

        const datas = {
            email: mail,
            team: team.teamName,
            token: token,
            url: "www.behappik.com",
        };
        Mailer.send(mail, 'd-3ddc12cac0664916b99d3a2af772d9f1', datas)
    });
    res.end();
};

/**
 * @api {post} /user/recover User changes its password.
 * @apiName Recover user's password
 * @apiGroup User
 *
 * @apiParam {String} email user email.
 * @apiParam {String} token key received by email.
 * @apiParam {String} password the new password.
 * @apiParam {String} passwordVerif check that password is really well defined.
 *
 * @apiSuccess (200) {String} 204
 * @apiError Forbidden.
 */
exports.recover = async function (req, res) {
    const email = req.body.email;
    const token = req.body.token;
    const password = req.body.password;
    const passwordVerif = req.body.passwordVerif;

    if (passwordVerif === password && Utils.regex('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', email)) {
        models.Recovery.find({})
        await models.User.find({
            where: {email: email}
        }).then(async user => {
            if (user) {
                models.Recovery.find({
                    where: {UserId: user.id, token: token}
                }).then(recovery => {
                    if (recovery) {
                        recovery.update({destroyable: true});
                        const hash = bcrypt.hashSync(password);
                        user.update({password: hash});
                        res.sendStatus(204);
                    } else {
                        res.sendStatus(403);
                    }
                })
            } else {
                res.sendStatus(403);
            }
        }).catch(error => {
            console.log(error)// Ooops, do some error-handling
        });
    } else {
        res.sendStatus(403);
    }
};

/**
 * @api {post} /user/reset User requests a new password.
 * @apiName Request a new password (token sent by email)
 * @apiGroup User
 *
 * @apiParam {String} email user email.

 * @apiSuccess (200) {String} 204
 * @apiError Forbidden.
 */
exports.reset = async function (req, res) {
    const email = req.body.email;
    if (Utils.regex('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', email)) {
        const token = require('crypto').randomBytes(10).toString('hex');
        console.log(token);
        models.User.findOne({
            where: {email: email}
        }).then(async user => {
            if (user) {
                models.Recovery.create({
                    token: token,
                    destroyable: false,
                }).then(recovery => {
                    const datas = {
                        email: email,
                        token: token,
                        url: "www.behappik.com",
                    };
                    Mailer.send(email, 'd-3ddc12cac0664916b99d3a2af772d9f1', datas);
                    recovery.setUser(user.id);
                    res.sendStatus(204);
                });
            } else {
                res.sendStatus(403);
            }
        }).catch(error => {
            console.log(error)// Ooops, do some error-handling
        });
    } else {
        res.sendStatus(400);
    }
};

/**
 * @api {post} /login User sign-in.
 * @apiName Login User
 * @apiGroup User
 *
 * @apiParam {String} email user email.
 * @apiParam {String} password user password.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *          "lastName": "Doe",
 *          "firstName": "John",
 *          "email": "j@doe.com",
 *          "id": "0",
 *          "team": "1",
 *          "role": "0"
 *       },
 *       "Authorization": xxxtokenxxx,
 *       "message": "Logged In Successfully"
 *     }
 */
exports.login = function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: err
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            user.password = undefined;
            const token = jwt.sign(JSON.stringify(user), 'HELLO');// @todo: process.env.JWT_TOKEN);
            return res.json({user, token});
        });
    })(req, res);
};


exports.secret = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log('secret')
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        logger.debug(user);
        if (err) {
            return res.json({msg: err});
        }
        if (user) {
            return res.send({user: user, msg: "You are authorized"});
        } else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};

/**
 * @api {post} /user/subscribe User finishes its profile.
 * @apiName Complete sign-up
 * @apiGroup User
 *
 * @apiParam {String} password the new password to be defined.
 * @apiParam {String} firstName the firstName to be add.
 * @apiParam {String} lastName the lastName to be add.
 * @apiParam {String} token the token received by email.
 *
 * @apiError Mot de passe trop court.
 * @apiError Mot de passe trop long.
 * @apiError Votre mot de passe doit contenir au moins 1 chiffre.
 * @apiError Votre mot de passe doit contenir au moins 1 majuscule.
 * @apiError Identifiant ou mot de passe temporaire incorrect.

 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400  Bad Request
 *     {
          error: "Identifiant ou mot de passe temporaire incorrect",
 *     }
 */
exports.subscribe = async function (req, res, next) {

    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const token = req.body.token;
    const email = req.body.email;
    const user = await models.User.findOne({
        where: {email: email}
    }).then(async user => {
        if (user) {
            await models.Recovery.findOne({
                where: {UserId: user.id, token: token, destroyable: false}
            }).then(async recover => {
                if (!recover)
                    res.status(400).send({error: "Aucune entrée correspondante"});
                const checkPassword = Utils.checkFormControl(user, password, req, res);
                if (checkPassword !== "success") {
                    return res.send(JSON.stringify({
                        checkPassword
                    }));
                } else {
                    const hash = bcrypt.hashSync(password);
                    console.log(hash);
                    await models.User.update(
                        {
                            password: hash,
                            firstName: firstName,
                            lastName: lastName
                        },
                        {
                            where: {email: email}
                        });
                    recover.update({destroyable: true});
                    return res.send(JSON.stringify(password));
                }
            }).catch((err, req, res, next) => {
                console.log(err);
            });
        } else {
            return res.send(JSON.stringify({
                error: "Identifiant ou mot de passe temporaire incorrect",
            }));
        }
    });

};

/**
 * @api {get} /user/me/ Get the current logged user's info
 * @apiName Get user info
 * @apiGroup User
 *
 * @apiSuccess {Object} user User data.
 * @apiError UserNotFound No connected user was not found.
 */
exports.me = function (req, res, next) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(403).json({msg: "You are not authorize"});
        }
    })(req, res);
};

/**
 * @api {delete} /user/:id Delete an user.
 * @apiName Delete an user
 * @apiGroup User
 *
 * @apiParam {Number} id user id.

 * @apiSuccess (202) {String} msg the returned message
 */
exports.delete = function (req, res, next) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        let msg = "";
        if (user.RoleId == 2) {
             del = await models.User.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (del)
                msg = "User deleted";
            else
                msg = "Not deleted";
        }
        res.status(202).send(msg);
    })(req, res);
};


/**
 * @api {get} /collabors Get all user of a company or team and all teams.
 * @apiName Get users and teams
 * @apiGroup User
 *
 * @apiSuccess (200) {Object} page the desired page with the survey
 */

exports.getCollaborators =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.status(520).json({err: err});
        }

        if (user) {

            if (typeof req.query.team === 'undefined' || typeof req.query.team !== 'string' || typeof req.query.team == null) {
                return res.status(409).json({err: 'Please specify a team'});
            }

            const teamParams = req.query.team;
            let users;

            if (teamParams === 'ALL') {
                users = await models.User.findAll({
                    attributes:['firstName', 'lastName', 'email', 'avatar', 'isRegistered']
                })
            } else {
                const team = await models.Team.find({
                    where: {
                        teamName: teamParams
                    }
                })

                if (!team) {
                    return res.status(404).json({err: 'There is no team for the name ' + teamParams});
                }

                users = await models.User.findAll({
                    where: {
                        TeamId: team.id
                    }, attributes:['firstName', 'lastName', 'email', 'avatar', 'isRegistered']
                })
            }

            const teams = await models.Team.findAll({
                attributes:['id', 'teamName']
            });

            return await res.json({employees : users, teams: teams})
        }
        else
            return res.status(401).json({err: "You are not authorize"});
    })(req, res);
};
