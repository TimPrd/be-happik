var express = require("express");
var router = express.Router();
var path = require("path");

//HOME
router.route("/").all(function (req, res) {
	res.send('Welcome on board ! '); 
});


/********************************************
 *             ROADS : Users                *
 ********************************************/
//router.get("/users", usersController.all)


module.exports = router;
