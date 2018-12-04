var express = require("express");
var router = express.Router();
var path = require("path");

const models = require('../models/index');


//HOME
router.route("/").all(function (req, res) {
	res.send('Welcome on board ! '); 
});

router.get("/users", async function(req, res, next) {
	const users = await models.User.findAll();
	console.log(users[0].name);
	res.send('Fetch : ' + users.length + ' users.') 
})

/********************************************
 *             ROADS : Users                *
 ********************************************/
//router.get("/users", usersController.all)


module.exports = router;
