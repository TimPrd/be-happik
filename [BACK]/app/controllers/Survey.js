const Mailer = require('./Mailer');
const models = require('../../models/');


exports.validate = async function (req, res) {
    const currentUser = req.body.currentUserId;
    const teams = req.body.teams;

    const idTeam = await models.Team.findOne({teamName: teams});
    const users = await models.User.findAll({
        where: {
            TeamId: idTeam.id
        }
    });

    users.forEach(user => {
        //Mailer.send(user.email, 'd-0ea007d61f4a415a8dfc8ebc143e759e', {});
        //models.Notify.create({}) //userId, msg, seen, senderId
        var io = req.app.get('socketio');
        var sockets = req.app.get('usersSocket');
        sockets[1/*user.id*/].emit('hi!', "important notification message");

    });
    res.send(users);
    //res.sendStatus(200);
}