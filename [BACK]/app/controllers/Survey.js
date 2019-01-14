const Mailer = require('./Mailer');
const models = require('../../models/');


exports.validate = async function (req, res) {
    const currentUserName = req.body.currentUserName;
    const teams = req.body.teams;
    const idTeam = await models.Team.findOne({where: {teamName: teams}});
    const users = await models.User.findAll({where: {TeamId: idTeam.id}});
    users.forEach(async user => {

        const datas = {
            email: user.email,
        };
        //Mailer.send(user.email, 'd-0ea007d61f4a415a8dfc8ebc143e759e', datas);
        await models.UserSurvey.create({
            //generate id survey
            //
        }).then(usersurvey => {
            usersurvey.setUser(user.id);
        });

        await models.Notification.create({
            title: "titre",
            body: "body",
            seen: false
        }).then(notif => {
            notif.setUser(user.id);
            notif.setSender(currentUserName);
        });

        //var io = req.app.get('socketio');
        //var sockets = req.app.get('usersSocket');
        //sockets[1/*user.id*/].emit('hi!', "important notification message");

    });
    res.status(200).send(users);
    //res.sendStatus(200);
};


exports.getSurveyByUser = async function (req, res) {
    const userId = req.params.id;
    await models.Survey.findAll({where: {userId: userId}}) //todo check where

};


exports.getAll = async function (req, res) {
    let limit = 9;   // number of records per page
    let offset = 0;
    models.Survey.findAndCountAll()
        .then((data) => {
            let pages = Math.ceil(data.count / limit);
            offset = limit * (req.query.page - 1);
            models.Survey.findAll({
                where: {state: res.query.state},
                limit: limit,
                offset: offset,
                $sort: {id: 1}
            })
                .then((surveys) => {
                    res.status(200).json({'result': surveys, 'count': data.count, 'pages': pages});
                });
        })
        .catch(function (error) {
            res.sendStatus(500);
        });
};
