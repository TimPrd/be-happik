'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('userSurveys', [{
        UserId: 1,
        SurveyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAnswered: false
      },{
        UserId: 2,
        SurveyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAnswered: false
      },{
        UserId: 4,
        SurveyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isAnswered: true
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
