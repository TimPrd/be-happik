const models = require('../../models/');
const {loggers} = require('winston');
const logger = loggers.get('my-logger');
const passport = require('passport');

exports.moodPerWeek = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            //toString().split(' ')[0];
            if (user && user.RoleId === 2) {
                let date = new Date(req.body.date.split("-").join(","));
                const day = date.toString().split(' ')[0];

                let start = new Date(2019,1,8);
                let end = new Date(2019,1,9);
                let mood = await models.userMood.findAll({
                    where: {
                        createdAt: {
                            $between: [start, end]
                        }
                    }
                });
                return res.status(200).send(mood);
            } else {
                return res.status(400).json({msg: "You are not authorize"});
            }
        }
    )
    (req, res);
};


