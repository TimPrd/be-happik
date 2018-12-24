'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATE,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,

  }, {});
  User.associate = function(models) {
      User.belongsTo(models.Role);
      User.belongsTo(models.Team);
  };
  return User;
};