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
                allowNull: false,
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
            isRegistered:{
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
