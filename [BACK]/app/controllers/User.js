const jwt = require('jsonwebtoken');
const passport = require('passport');
const models = require('../../models/');
const Utils = require('./Utils');
const bcrypt = require('bcrypt');

exports.signup = function (req, res) {
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
    res.setHeader('Content-Type', 'application/json');
    console.log('secret')
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }
        if(user)
            return res.json({msg: "You are authorized"});
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
}

exports.subscribe =  async function (req, res, next) {

    const password = req.body.password;
    const tempPassword = req.body.tempPassword;
    const email = req.body.email;
    const user =  await models.User.findOne({
        where: {
            email: email,
            password: tempPassword,
        }
    });

    if (user === null) {

        return res.send(JSON.stringify({
            error: "Identifiant ou mot de passe temporaire incorrect",
        }));
    }

    const checkPassword = Utils.checkFormControl(user,password,req,res);

    if (checkPassword !== "success") {
        return res.send(JSON.stringify({
            checkPassword
        }));
    } else {
        bcrypt.hash(password, 10, function(err, hash) {
            models.User.update(
                {
                    password: hash
                },
                {
                    where: {
                        email: email
                    }
                });
            return res.send(JSON.stringify(password));
        });
    }
};
