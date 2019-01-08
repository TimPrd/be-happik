'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    creationUpdate: DataTypes.DATE,
    description: DataTypes.STRING,
    predefined: DataTypes.BOOLEAN
  }, {});
  Question.associate = function(models) {
    Question.belongsTo(models.User)
    // associations can be defined here
  };
  return Question;
};
