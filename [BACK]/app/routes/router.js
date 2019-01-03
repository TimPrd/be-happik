var express = require("express");
var router = express.Router();

const models = require('../../models/');
const controller = require('../controllers/');

//HOME
router.route("/").all(function (req, res) {
    res.send('Welcome on board ! ');
});

router.post("/user/subscribe", controller.User.subscribe);

router.get("/users", async function(req, res, next) {
	const users = await models.User.findAll({});
});

router.get('/test', async function (req, res, next) {
    let team = await models.Team.findOne({where: {teamName: "JKRow"}});

    models.User.create({
        email: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
        password:""
    }).then(function(created){
        console.log(created);
        created.setTeam(team.id);
        models.Recovery.create({
            token: "token",
            destroyable: false,
        }).then(recovery => {
            return recovery.setUser(created.id)
        })
    });
});


router.post("/login", controller.User.login);
router.post("/register", controller.User.register);
router.put("/reset/:email", controller.User.reset);
router.put("/recover/:email", controller.User.recover);

router.get("/secret", controller.User.secret)

/********************************************
 *             ROADS : Users                *
 ********************************************/


module.exports = router;

