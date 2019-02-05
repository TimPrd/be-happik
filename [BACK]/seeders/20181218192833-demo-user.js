'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Roles', [
            {
                roleName: 'Manager',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                roleName: 'Employee',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

        await queryInterface.bulkInsert('Teams', [
            {
                teamName: 'Gryffindor',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamName: 'Hufflepuff',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamName: 'Ravenclaw',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                teamName: 'Slytherin',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});

        await queryInterface.bulkInsert('Users', [
            /* Gryffindor */
            {
                firstName: 'Harry',
                lastName: 'Potter',
                email: 'harry@potter.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "horcrux",
                TeamId: 1,
                RoleId: 1,
            },
            {
                firstName: 'Ron',
                lastName: 'Weasley',
                email: 'ron@weasley.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "croutard",
                TeamId: 1,
                RoleId: 2,
            },
            {
                firstName: 'Hermione',
                lastName: 'Granger',
                email: 'hermione@granger.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "leviosa",
                TeamId: 1,
                RoleId: 2,
            },

            /* Hufflepuff */
            {
                firstName: 'Newton',
                lastName: 'Scamander',
                email: 'newton@scamander.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "niffler",
                TeamId: 2,
                RoleId: 2,
            },
            {
                firstName: 'Cedric',
                lastName: 'Diggory',
                email: 'cedric@diggory.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "avadakedavra",
                TeamId: 2,
                RoleId: 2,
            },
            {
                firstName: 'Edward',
                lastName: 'Lupin',
                email: 'edward@lupin.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "werewolf",
                TeamId: 2,
                RoleId: 1,
            },


            /* Ravenclaw */
            {
                firstName: 'Cho',
                lastName: 'Chang',
                email: 'cho@chang.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "cedric",
                TeamId: 3,
                RoleId: 2,
            },
            {
                firstName: 'Luna',
                lastName: 'Lovegood',
                email: 'luna@lovegood.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "weird",
                TeamId: 3,
                RoleId: 2,
            },
            {
                firstName: 'Mimi',
                lastName: 'Geignarde',
                email: 'mimi@geignarde.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "wc",
                TeamId: 3,
                RoleId: 1,
            },

            /* Slytherin */
            {
                firstName: 'Drago',
                lastName: 'Malefoy',
                email: 'drago@malefoy.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "slytherin",
                TeamId: 4,
                RoleId: 2,
            },
            {
                firstName: 'Bellatrix',
                lastName: 'Lestrange',
                email: 'bellatrix@lestrange.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "sirius",
                TeamId: 4,
                RoleId: 2,
            },
            {
                firstName: 'Dolores',
                lastName: 'Ombrage',
                email: 'dolores@ombrage.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "pink",
                TeamId: 4,
                RoleId: 2
            },
            {
                firstName: 'Vincent',
                lastName: 'Crabbe',
                email: 'vincent@crabbe.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "drago",
                TeamId: 4,
                RoleId: 2
            },
            {
                firstName: 'Gregory',
                lastName: 'Goyle',
                email: 'gregory@goyle.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "drago",
                TeamId: 4,
                RoleId: 2
            },
            {
                firstName: 'Tom',
                lastName: 'Jedusor',
                email: 'tom@jedusor.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "harry",
                TeamId: 4,
                RoleId: 1
            },
            {
                firstName: 'Rogue',
                lastName: 'Severus',
                email: 'rogue@severus.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: "lilypotter",
                RoleId: 2,
                TeamId: 4
            }], {});
        await queryInterface.sequelize.query('update "Teams" SET "ManagerId" = 16 where id = 1;')
        await queryInterface.sequelize.query('update "Teams" SET "ManagerId" = 4 where id = 2;')
        await queryInterface.sequelize.query('update "Teams" SET "ManagerId" = 8 where id = 3;')
        return await queryInterface.sequelize.query('update "Teams" SET "ManagerId" = 11 where id = 4;')

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
