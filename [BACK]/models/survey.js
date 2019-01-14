'use strict';
module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.STRING,
    open: DataTypes.BOOLEAN
  }, {});
  Survey.associate = function(models) {
    Survey.belongsTo(models.User);
  };
  return Survey;
};
