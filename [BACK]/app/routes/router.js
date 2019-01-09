var express = require("express");
var router = express.Router();

const models = require('../../models/');
const controller = require('../controllers/');
var path = require('path');
var appDir = path.dirname(require.main.filename);

//HOME
router.route("/").all(function (req, res) {
    var io = req.app.get('socketio');
    io.emit('hi!');
    //res.sendFile(__dirname + '/index.html');
    res.send('Welcome on board ! ');
});

/********************************************
 *             ROADS : Users                *
 ********************************************/

router.post("/user/subscribe", controller.User.subscribe);

router.get("/users", async function(req, res, next) {
	const users = await models.User.findAll({});
});

router.post("/user/register", controller.User.register);
router.post("/user/reset/", controller.User.reset);
router.post("/user/recover/", controller.User.recover);


/********************************************
 *             ROADS : Login                *
 ********************************************/

router.post("/login", controller.User.login);
router.get("/secret", controller.User.secret)


/********************************************
 *             ROADS : Survey               *
 ********************************************/
router.post("/survey/validate", controller.Survey.validate);



module.exports = router;

