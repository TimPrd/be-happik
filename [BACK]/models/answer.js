'use strict';
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    result: DataTypes.INTEGER
  }, {});
  answer.associate = function(models) {
    // associations can be defined here
  };
  return answer;
};