'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    teamName: DataTypes.STRING
  }, {});
  Team.associate = function(models) {
    Team.belongsTo(models.User)
    // associations can be defined here
  };
  return Team;
};
