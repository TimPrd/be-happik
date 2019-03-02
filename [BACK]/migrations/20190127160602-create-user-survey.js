'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('userSurveys', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            isAnswered: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('userSurveys');
    }
};