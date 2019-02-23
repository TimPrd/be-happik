const jwt = require('jsonwebtoken');
const passport = require('passport');
const models = require('../../models/');
const Utils = require('./Utils');
const bcrypt = require('bcrypt-nodejs');
const Mailer = require('./Mailer');
const {loggers} = require('winston')
const logger = loggers.get('my-logger')


/**
 * @api {post} /user/register Register users.
 * @apiName Register User
 * @apiGroup User
 *
 * @apiParam {Object[]} User users email and team id.
 * @apiParam {String} User.email email The mail of the user to add.
 * @apiParam {Number} User.team team The id team the user will join.
 *
 * @apiParamExample {json} Request-Example:
 *
 *  [
 *    {
 *      "email": "harry@potter.com",
 *      "team": 2
 *    },
 *    {
 *      "email": "hermioner@granger.com",
 *      "teamId": 4
 *    }
 *  ]
 *
 * @apiSuccess {String} res Users created
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Users created"
 *     }
 *
 * @apiError ServerError (5XX) Problem with authentification on server.
 * @apiError WrongParams (4XX) No email have been found.
 * @apiError UserNotFound (4XX) You are not authorize to perform this operation.
 * @apiError WrongParams (4XX) The data you sent is not what expected.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "The data you sent is not what expected"
 *     }
 *
 */
exports.register = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.status(520).json(err);
        }

        if (!Array.isArray(req.body)) {
            res.status(400).json('The data you sent is not what expected')
        }

        //remove non valid email
        let newUsers = req.body.filter(x => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x.email));
        //remove duplicates
        newUsers = newUsers.filter((user, index, self) =>
            index === self.findIndex((u) =>
                (u.email === user.email && typeof user.email === 'string' && typeof user.team === 'number'))
        );

        if (newUsers.length) {
            newUsers.forEach(async newUser => {
                const token = require('crypto').randomBytes(10).toString('hex');
                console.log("token : ", token);
                if (user.RoleId === 2) {
                    let userInDb = await models.User.find({
                        where: {email: newUser.email, isRegistered: false}
                    });
                    if (!userInDb) {
                        let createdUser = await models.User.create({
                            email: newUser.email,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            RoleId: 1,
                            TeamId: newUser.team
                        });
                        const userTeam = await createdUser.getTeam();
                        let recover = await models.Recovery.create({
                            token: token,
                            destroyable: false,
                        });
                        const datas = {
                            email: newUser.email,
                            team: userTeam.dataValues.teamName,
                            token: token,
                            url: "www.behappik.com",
                        };
                        //Mailer.send(newUser.email, 'd-3ddc12cac0664916b99d3a2af772d9f1', datas);
                        await recover.setUser(createdUser.id);
                    }
                } else {
                    res.status(401).json("You are not authorize to perform this operation");
                }
            })
        } else {
            res.status(404).json("No email have been found");
        }
        res.status(201).json("Users created");
    })(req, res);
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
            return res.status(400).json(err);
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.status(500).send(err);
            }
            user.password = undefined;
            const token = jwt.sign(JSON.stringify(user), 'HELLO');// @todo: process.env.JWT_TOKEN);
            return res.send(200).json({user, token});
        });
    })(req, res);
};


exports.secret = function (req, res) {


    res.setHeader('Content-Type', 'application/json');
    console.log('secret')
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        logger.debug(user);
        if (err) {
            return res.status(500).json(err);
        }
        if (user) {
            return res.status(200).send({user: user});
        } else
            return res.status(401).json("You are not authorize");
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
                    res.status(400).send("No matching data");
                const checkPassword = Utils.checkFormControl(user, password, req, res);
                if (checkPassword !== "success") {
                    return res.json(checkPassword);
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
                    return res.status(200).json(password);
                }
            }).catch((err, req, res, next) => {
                console.log(err);
                return res.status(500).json('There is some problem');
            });
        } else {
            return res.status(401).json("Wrong email or temporary password");
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
            return res.status(500).json(err);
        }

        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(403).json("You are not authorize");
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
        if (user.RoleId === 2) {
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

exports.getCollaborators = function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.status(520).json(err);
        }

        if (user) {

            if (typeof req.query.team === 'undefined' || typeof req.query.team !== 'string' || typeof req.query.team == null) {
                return res.status(409).json('Please specify a team');
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
                    return res.status(404).json('There is no team for the name ' + teamParams);
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

            return await res.status(200).json({employees : users, teams: teams})
        }
        else
            return res.status(401).json("You are not authorize");
    })(req, res);
};

/**
 * @api {post} /user/password/reset Reset the password of a user
 * @apiName Reset password
 * @apiGroup User
 *
 * @apiSuccess (200) {Object    } page the desired page with the survey
 */

exports.resetPassword =  function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.status(520).json(err);
        }

        if (user) {

            if (typeof req.query.team === 'undefined' || typeof req.query.team !== 'string' || typeof req.query.team == null) {
                return res.status(409).json('Please specify a team');
            }

            const teamParams = req.query.team;
            let users;

            if (teamParams === 'ALL') {
                users = await models.User.findAll({
                    attributes: ['firstName', 'lastName', 'email', 'avatar', 'isRegistered']
                })
            } else {
                const team = await models.Team.find({
                    where: {
                        teamName: teamParams
                    }
                })

                if (!team) {
                    return res.status(404).json('There is no team for the name ' + teamParams);
                }

                users = await models.User.findAll({
                    where: {
                        TeamId: team.id
                    }, attributes: ['firstName', 'lastName', 'email', 'avatar', 'isRegistered']
                })
            }

            const teams = await models.Team.findAll({
                attributes: ['id', 'teamName']
            });


            return await res.json({employees : users, teams: teams})
        }
        else {
            return res.status(401).json("You are not authorize");
        }
    })(req, res);
};
