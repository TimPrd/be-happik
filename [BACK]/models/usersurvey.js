'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersurvey = sequelize.define('usersurvey', {
    description: DataTypes.STRING
  }, {});
  usersurvey.associate = function(models) {
    // associations can be defined here
  };
  return usersurvey;
};