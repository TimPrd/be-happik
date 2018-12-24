var express = require("express");
var router = express.Router();

const models = require('../../models/');
const controller = require('../controllers/');

//HOME
router.route("/").all(function (req, res) {
    res.send('Welcome on board ! ');
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

router.get("/users", async function (req, res, next) {
    const users = await models.User.findAll({});
    /*User.findAll({
        where:  {
            id: 2
        },
        include: [
            { model: controllers.Role, as: 'role'  }, // load all pictures
        ]
    })
    const role = models.Role.build({roleName: 'Admin'});
    const usr  = models.User.build({ firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "password"
	});

    usr.setRole([role]).then(() => {
        console.log(usr);
        /*usr.getRoles().then(associatedTasks => {
        	console.log("ASSOCIATED", associatedTasks)
            // associatedTasks is an array of tasks
        })*/
    //console.log(users[0]);
    res.send('Fetch : ' + JSON.stringify(users));//users.length + ' users.')
});

router.post("/login", controller.User.login);
router.post("/register", controller.User.register);
router.put("/reset/:email", controller.User.reset);
router.put("/recover/:email", controller.User.recover);

router.get("/secret", controller.User.secret)

/********************************************
 *             ROADS : Users                *
 ********************************************/
//router.get("/users", usersController.all)


module.exports = router;
/*
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            birthday: {
                type: Sequelize.DATE
            },
            avatar: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            role: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};



'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        birthday: DataTypes.DATE,
        avatar: DataTypes.STRING,
        password: DataTypes.STRING
    }, {});
    User.associate = function (controllers) {
        User.belongsTo('roles'); // Adds fk_company to User
    };
    return User;
};
 */