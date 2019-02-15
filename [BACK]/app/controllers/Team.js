const passport = require('passport');
const models = require('../../models/');

// todo : if teamlist q = not present => getAll

/**
 * @api {get} /user/me/ Get the current logged user's info
 * @apiName Get user info
 * @apiGroup User
 *
 * @apiSuccess {Object} user User data.
 * @apiError UserNotFound No connected user was not found.
 */
exports.getTeamList = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (user && user.RoleId === 2) {
            let q = null;
            if (typeof req.query.q !== 'undefined') {
                q = parseInt(req.query.q);
            }
            await models.Team.findAll({
                where:{
                    ManagerId:user.id,
                },
                limit:q,
            }).then(data => {
                const teams = data.map(team => team.teamName);
                return res.status(200).send(teams);
            } )
        }
        else
            return res.json({msg: "You are not authorize"});
    })(req, res);
};


/**
 * @api {post} /team/ Create a / plural new team (max 10)
 * @apiName Create a new team
 * @apiGroup Team
 * @apiParam {String[]} teams names of all the concerned teams.
 */
exports.postCreateTeams = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }

        if (!user) {
            return res.json({msg: "You are not authorize"});
        }

        const u = await models.User.find({
            where: {
                id: user.id
            }
        });

        if (u.RoleId !== 1) {
            return res.json({msg: "You are not authorize"});
        }

        const teamsBody = req.body.teams;

        if (teamsBody.length > 10) {
            return res.json({msg: "You can't add more than 10 teams."});
        }

        let teams = [];
        let i = 0;

        for (const team of teamsBody) {
            teams[i] = await models.Team.create({teamName: team.name});
            await teams[i].setUser(u)
            i++;
        }

        return res.json({msg: 'All your teams have been added'})
    })(req, res)
}
