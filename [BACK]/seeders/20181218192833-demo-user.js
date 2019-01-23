'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Roles', [
            {
                roleName: 'Manager',
                id:0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

        await queryInterface.bulkInsert('Teams', [
            {
                id:5,
                teamName: 'JKRow',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

        return await queryInterface.bulkInsert('Users', [
            {
                firstName: 'Harry',
                lastName: 'Potter',
                email: 'harry@potter.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "horcrux",
                TeamId: 5
            },
            {
                firstName: 'Rogue',
                lastName: 'Severus',
                email: 'rogue@severus.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "lilypotter",
                RoleId: 0,
                TeamId: 5
            }], {});


    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
