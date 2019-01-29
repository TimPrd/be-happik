var express = require("express");
var router = express.Router();

const models = require('../../models/');
const controller = require('../controllers/');
var path = require('path');
var appDir = path.dirname(require.main.filename);

//HOME
/*router.route("/").all(function (req, res) {
    var io = req.app.get('socketio');
    io.emit('hi!');
    //res.sendFile(__dirname + '/index.html');
    res.send('Welcome on board ! ');
});*/

/********************************************
 *             ROADS : Users                *
 ********************************************/

router.post("/user/subscribe", controller.User.subscribe);

router.get("/users", async function (req, res, next) {
    const users = await models.User.findAll({});
});

router.post("/user/register", controller.User.register);
router.post("/user/reset/", controller.User.reset);
router.post("/user/recover/", controller.User.recover);
router.get("/user/:id/surveys", controller.Survey.getSurveyByUser);

router.post("/user/register", controller.User.register);
router.post("/user/reset/", controller.User.reset);
router.post("/user/recover/", controller.User.recover);
router.get("/question/predefined/", controller.Question.getPredefined);
router.get("/team/list/", controller.Team.getTeamList);


/********************************************
 *             ROADS : Login                *
 ********************************************/

router.post("/login", controller.User.login);
//TODO Create me route (replace login)
router.get("/user/:id/me", controller.User.login)


/********************************************
 *             ROADS : Survey               *
 ********************************************/
router.post("/survey/validate", controller.Survey.validate);
router.get("/surveys", controller.Survey.getAll);
router.get("/surveys/answer", controller.Survey.getAnswer);


module.exports = router;

