'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.bulkInsert('Surveys', [{
            id:1,
            title:"Survey#1",
            description:"Un magnifique survey [wahou]",
            startDate: new Date(),
            endDate:"",
            open:true,
            AuthorId:1,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});

        return await queryInterface.bulkInsert('Teamsurveys', [
            {
                TeamId: 5,
                SurveyId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Teamsurveys', null, {});
        return queryInterface.bulkDelete('Surveys', null, {});

    }
};
