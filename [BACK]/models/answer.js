'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.Question);
    Answer.belongsTo(models.Survey);
    Answer.belongsTo(models.User);
  };
  return Answer;
};
