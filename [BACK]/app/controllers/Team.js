const passport = require('passport');
const models = require('../../models/');

exports.getTeamList = async function (req, res) {
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err) {
            return res.json({msg: err});
        }
        //Todo : check manager
        if (user) {
            let q = 100;
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
}
