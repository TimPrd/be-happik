'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionSurvey = sequelize.define('QuestionSurvey', {
  }, {});
  QuestionSurvey.associate = function(models) {
    QuestionSurvey.belongsTo(models.Survey);
    QuestionSurvey.belongsTo(models.Question);

  };
  return QuestionSurvey;
};
