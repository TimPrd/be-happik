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
 *             Many Instances               *
 ********************************************/


router.get("/users", async function (req, res, next) {
    const users = await models.User.findAll({});
    res.send(users[0].dataValues);
});

router.post("/user/register", controller.User.register);
router.post("/user/reset/", controller.User.reset);
router.post("/user/recover/", controller.User.recover);
router.get("/user/secret", controller.User.secret);


router.get("/question/predefined/", controller.Question.getPredefined);
router.get("/team/list/", controller.Team.getTeamList);


/********************************************
 *             ROADS : User                 *
 *             One Instance                 *
 ********************************************/
router
    .get("/user/me", controller.User.me)
    .get("/user/:id/surveys", controller.Survey.getSurveyByUser)
    .post("/user/register", controller.User.register)
    .post("/user/reset/", controller.User.reset)
    .post("/user/recover/", controller.User.recover)
    .post("/user/subscribe", controller.User.subscribe)
    .delete("/user/:id", controller.User.delete);


/********************************************
 *             ROADS : Login                *
 ********************************************/

router.post("/login", controller.User.login);
//TODO Create me route (replace login)
//router.get("/user/:id", controller.User.login)


/********************************************
 *             ROADS : Survey               *
 ********************************************/
router.post("/survey/validate", controller.Survey.validate);
router.get("/surveys", controller.Survey.getAll);
router.get("/survey/:id/answers", controller.Survey.getSurveyWithAnswers);
router.get("/survey/:id", controller.Survey.getSurvey);
router.put("/survey/:idSurvey/answers/:idAnswer", controller.Survey.putAnswers);

/********************************************
 *              ROADS : Mood                *
 ********************************************/
router
    //.get('/user/:id/moods')
    //.get('/users/moods')
    .post('/user/:id/mood', controller.Mood.create);
module.exports = router;

