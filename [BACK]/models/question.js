'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    predefined: DataTypes.BOOLEAN
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User)
    // associations can be defined here
  };
  return Question;
};
