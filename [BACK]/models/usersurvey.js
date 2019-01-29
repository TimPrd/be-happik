'use strict';
module.exports = (sequelize, DataTypes) => {
  const userSurvey = sequelize.define('userSurvey', {
  }, {});
  userSurvey.associate = function(models) {
    userSurvey.belongsTo(models.User, {as: "User"});
    userSurvey.belongsTo(models.Survey, {as: "Survey"});
  };
  return userSurvey;
};