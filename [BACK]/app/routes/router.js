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

router
    .get("/user/secret", controller.User.secret)
    .post("/user/register", controller.User.register)
    .post("/user/reset", controller.User.reset)
    .post("/user/recover", controller.User.recover);


router.get("/question/predefined/", controller.Question.getPredefined);


/********************************************
 *             ROADS : User                 *
 *             One Instance                 *
 ********************************************/
router
    .get("/user/me", controller.User.me)
    .post("/user/register", controller.User.register)
    .post("/user/reset", controller.User.reset)
    .post("/user/recover", controller.User.recover)
    .post("/user/subscribe", controller.User.subscribe)
    .delete("/user/:id", controller.User.delete)
    .get("/collaborators", controller.User.getCollaborators);


/********************************************
 *             ROADS : Login                *
 ********************************************/

router.post("/login", controller.User.login);
//TODO Create me route (replace login)
//router.get("/user/:id", controller.User.login)


/********************************************
 *             ROADS : Survey               *
 ********************************************/
router
    .get("/surveys", controller.Survey.getAllSurveys)
    .get("/surveys/user/:idUser", controller.Survey.getSurveysByUser)
    .get("/survey/:idSurvey/answers", controller.Survey.getSurveyWithAnswers)
    .get("/survey/:idSurvey", controller.Survey.getSurvey)
    .post("/survey/:idSurvey/answers", controller.Survey.postAnswers)
    .post("/survey/validate", controller.Survey.validate)
    .put("/survey/:idSurvey/answers", controller.Survey.putAnswers);

/********************************************
 *              ROADS : Mood                *
 ********************************************/
router
//.get('/user/:id/moods')
//.get('/users/moods')
    .post('/user/:id/mood', controller.Mood.create);

/********************************************
 *             ROADS : Teams                *
 ********************************************/

router
    .get("/team/list", controller.Team.getTeamList)
    .post("/team", controller.Team.postCreateTeams);

/********************************************
 *             ROADS : Stats                *
 ********************************************/
router
    .get('/analytic/mood', controller.Analytic.moodPerWeek)
    .get('/analytic/count', controller.Analytic.counts)
    .get('/analytic/survey/response', controller.Analytic.surveyResponse)
    .get('/analytic/survey/status', controller.Analytic.surveyStatus);

module.exports = router;

