const models = require('../../models/');
const {loggers} = require('winston');
const logger = loggers.get('my-logger');
const passport = require('passport');
const Utils = require('./Utils');

exports.MOODS = Object.freeze([0, 25, 50, 75, 100]);

checkMoodScore = (score) => {
    const POSSIBLE_MOOD = {
        0: "Very unsatisfied",
        25: "unsatisfied",
        50: "Neutral",
        75: "Satisfied",
        100: "Very satisfied"
    };

    if (POSSIBLE_MOOD[score]) {
        return POSSIBLE_MOOD[score];
    } else {
        return undefined;
    }
};
/**
 * @api {post} /user/:id/mood Create a new mood for a user (only one per day / can also fetch data)
 * @apiName Create a new user's mood
 * @apiGroup Mood
 * @apiParam {String} id  params - id of the user.
 * @apiParam {Number} mood  mood score (0,25,50,75,100)
 * @apiParam {String} date  current date ("2019-02-31") -> deal with jet-lag.
 *
 *
 */
exports.create = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
            if (user && user.id === req.params.id) {
                if (!req.body.mood || checkMoodScore(req.body.mood) === undefined) {
                    return res.status(400).json("Your mood score cannot be recognized.")
                } else {
                    let date = req.body.date.split("-").join(",");
                    let mood = await models.userMood.findOrCreate({
                        where: {
                            UserId: user.id,
                            createdAt: new Date()
                        },
                        defaults:
                            {
                                mood: req.body.mood,
                                UserId: user.id,
                                createdAt: new Date(date)
                            }
                    });
                    return res.status(200).send(mood);
                }
            } else {
                return res.status(401).json({msg:"You are not authorize"});
            }
        }
    )
    (req, res);
};


