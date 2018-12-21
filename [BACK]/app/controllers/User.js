const jwt = require('jsonwebtoken');
const passport = require('passport');

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