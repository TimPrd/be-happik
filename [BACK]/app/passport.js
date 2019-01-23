const passport = require('passport');
const passportJWT = require("passport-jwt");
const bcrypt = require('bcrypt-nodejs');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const models = require('./../models/');


passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        return models.User.findOne({where: {email: email}})
            .then(async user => {
                const match = await bcrypt.compare(password, user.password, res => {
                    if(res) {
                        return cb(null, user, {message: 'Logged In Successfully'});
                    }
                    return cb(null, false, {message: 'Incorrect email or password.'});
                });

            })
            .catch(err => {
                console.log('error', err)
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'HELLO' //@todo : to be transformed into dotenv
    },
    function (jwtPayload, cb) {
        //find the user in db if needed
        return models.User.findOne({where: {id: jwtPayload.id},   attributes: {exclude: ['password']}})
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
