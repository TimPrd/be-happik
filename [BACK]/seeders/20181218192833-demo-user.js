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
                id:3,
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
            },
            {
                firstName: 'Rogue',
                lastName: 'Severus',
                email: 'rogue@severus.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "lilypotter",
                RoleId: 0,
                TeamId: 3
            }], {});


    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
