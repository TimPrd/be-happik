'use strict';
module.exports = (sequelize, DataTypes) => {
  const userSurvey = sequelize.define('userSurvey', {
      isAnswered: DataTypes.BOOLEAN
  }, {});
  userSurvey.associate = function(models) {
    userSurvey.belongsTo(models.User);
    userSurvey.belongsTo(models.Survey);
  };
  return userSurvey;
};