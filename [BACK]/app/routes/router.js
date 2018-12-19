var express = require("express");
var router = express.Router();
var path = require("path");

const models = require('../../models/');


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
    User.associate = function (models) {
        User.belongsTo('roles'); // Adds fk_company to User
    };
    return User;
};
 */