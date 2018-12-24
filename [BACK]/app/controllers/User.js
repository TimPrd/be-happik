const jwt = require('jsonwebtoken');
const passport = require('passport');
const models = require('../../models/');
const Mailer = require('./Mailer');
const Utils = require('./Utils');

exports.register = async function (req, res) {
    const rawEmails = req.body.email;
    const rawteam = req.body.team;
    const currentUser = req.body.currentUser;

    let sortedEmail = [...new Set(rawEmails)];
    let users = [];
    let team = await models.Team.findOne({where: {teamName: rawteam}});

    sortedEmail.forEach(async function (mail) {
            if (Utils.regex('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', mail)) {
                const token = require('crypto').randomBytes(10).toString('hex');
                models.User.find({
                    where: {id: currentUser.id, RoleId: 0}
                }).then(async currentUsr => {
                    if (currentUsr) {
                        await models.User.find({
                            where: {email: mail, isRegistered: false}
                        }).then(async user => {
                            if (!user) {
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
                //Mailer.send(mail, 'd-3ddc12cac0664916b99d3a2af772d9f1', datas)
            }
        }
    );
    res.end();
};

exports.recover = async function (req, res) {
    const email = req.params.email;
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
                        //todo : bcrypt
                        user.update({password: password})
                    }
                })
            }
        }).catch(error => {
            console.log(error)// Ooops, do some error-handling
        });
    }
};

exports.reset = async function (req, res) {
    const email = req.params.email;
    if (Utils.regex('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', email)) {
        const token = require('crypto').randomBytes(10).toString('hex');
        models.User.find({
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
                    //Mailer.send(mail, 'd-3ddc12cac0664916b99d3a2af772d9f1', datas)
                    return recovery.setUser(user.id)
                })
            }
        }).catch(error => {
            console.log(error)// Ooops, do some error-handling
        });
    }
};

exports.login = function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: err,
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(JSON.stringify(user), 'HELLO');// @todo: process.env.JWT_TOKEN);
            return res.json({user, token});
        });
    })(req, res);
};

exports.secret = function (req, res) {
    console.log('secret')
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }
        if (user)
            return res.json({msg: "You are authorized"});
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};

