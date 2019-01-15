'use strict';
module.exports = (sequelize, DataTypes) => {
  const Questionsurvey = sequelize.define('Questionsurvey', {
    place: DataTypes.INTEGER
    }, {});
    Questionsurvey.associate = function(models) {
      Questionsurvey.belongsTo(models.Survey);
      Questionsurvey.belongsTo(models.Question);

  };
  return Questionsurvey;
};
