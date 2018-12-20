'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            firstName: 'John',
            lastName: 'Doe',
            email: 'demo@demo.com',
            createdAt: new Date(),
            updatedAt: new Date(),
            password: "password",
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
