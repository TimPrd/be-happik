'use strict';
const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {

        let records =  [];
        for (let i = 0; i < 100; i++) {
            records[i] = {
                title: faker.name.title(),
                createdAt: new Date(),
                updatedAt: new Date(),
                description: faker.lorem.sentence(),
                predefined: faker.random.boolean(),
                //UserId: 1, to delete ?
            }
        }

        return await queryInterface.bulkInsert('Questions', records/*[{
         /*   title: 'Which is the best OS for webdevelopment ?',
            createdAt: new Date(),
            updatedAt: new Date(),
            description: 'Mac VS Linux VS Windows',
            predefined: true,
            UserId: 1,
        },
            {
                id: 2,
                title: 'Which is the best IDE for webdevelopment ?',
                createdAt: new Date(),
                updatedAt: new Date(),
                description: 'PhpStorm VS VsCode',
                predefined: true,
                UserId: 2,
            }, {
                id: 3,
                title: 'Which is the best Javascript framework ?',
                createdAt: new Date(),
                updatedAt: new Date(),
                description: 'Vue VS React VS Angular',
                predefined: false,
                UserId: 2,
            }]*/, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Questions', null, {});

    }
};
