'use strict';
const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let recordsSurvey = [];
        let recordsTeamSurvey = [];
        let recordsQuestion =  [];
        let recordsQuestionSurvey = [];
        let userManagers = [1, 6, 9, 13];

        for (let i = 0; i < 20; i++) {
            let randomManager = userManagers[Math.floor(Math.random() * userManagers.length)];
            recordsSurvey[i] = {
                title: faker.name.title(),
                startDate: new Date(),
                endDate: "",
                open: i % 18 !== 0,
                AuthorId: randomManager,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            recordsTeamSurvey[i] = {
                SurveyId: i + 1,
                TeamId: userManagers.indexOf(randomManager) + 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }

        for (let i = 0; i < 100; i++) {
            recordsQuestion[i] = {
                title: faker.name.title(),
                createdAt: new Date(),
                updatedAt: new Date(),
                description: faker.lorem.sentence(),
                predefined: faker.random.boolean(),
                //UserId: 1, to delete ?
            };
            recordsQuestionSurvey[i] = {
                QuestionId: i+1,
                SurveyId: Math.floor(Math.random() * (20 - 1 + 1)) + 1,
                place: Math.floor(Math.random() * (50 - 1 + 1)) + 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }



        await queryInterface.bulkInsert('Surveys', recordsSurvey, {});
        await queryInterface.bulkInsert('Questions', recordsQuestion,{});

        await queryInterface.bulkInsert('Questionsurveys', recordsQuestionSurvey, {});

        return await queryInterface.bulkInsert('Teamsurveys', recordsTeamSurvey, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Teamsurveys', null, {});
        return queryInterface.bulkDelete('Surveys', null, {});

    }
};
