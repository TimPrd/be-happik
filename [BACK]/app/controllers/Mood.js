const models = require('../../models/');
const {loggers} = require('winston');
const logger = loggers.get('my-logger');
const passport = require('passport');

exports.create = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (user && user.id == req.params.id) {
                let date = req
                let mood = await models.userMood.findOrCreate({
                    where: {
                        UserId: user.id,
                        createdAt:  new Date(req.body.date.split("-").join(","))
                    },
                    defaults:
                        {
                            mood: req.body.mood,
                            UserId: user.id,
                            createdAt: new Date(req.body.date.split("-").join(","))
                        }
                });
                return res.status(200).send(mood);
            } else {
                return res.status(400).json({msg: "You are not authorize"});
            }
        }
    )
    (req, res);

}
;
