'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('answers', [{
        result: '50',
        SurveyId: 1,
        UserId:2,
        QuestionId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        result: '25',
        SurveyId: 1,
        UserId:2,
        QuestionId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        result: '100',
        SurveyId: 1,
        UserId:1,
        QuestionId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
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
