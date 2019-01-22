'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Questions_Surveys', // name of Source model
        'QuestionId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Questions", // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'QuestionsSurveys', // name of Source model
        'QuestionId' // key we want to remove
    );
  }
};

