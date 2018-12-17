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
    /*User.findAll({
        where:  {
            id: 2
        },
        include: [
            { model: models.Role, as: 'role'  }, // load all pictures
        ]
    })*/
	console.log(users[0]);
    res.send('Fetch : ' + users[0].firstname);//users.length + ' users.')
})

router.post("/signup", async function(req,res,next) {

})

/********************************************
 *             ROADS : Users                *
 ********************************************/
//router.get("/users", usersController.all)


module.exports = router;
