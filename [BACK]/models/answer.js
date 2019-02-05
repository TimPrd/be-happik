'use strict';
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    result: DataTypes.INTEGER
  }, {});
  answer.associate = function(models) {
    answer.belongsTo(models.Survey);
    answer.belongsTo(models.Question);
    answer.belongsTo(models.User);
  };
  return answer;
};