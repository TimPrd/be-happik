'use strict';
module.exports = (sequelize, DataTypes) => {
    const userMood = sequelize.define('userMood', {
        mood: DataTypes.INTEGER,
    }, {});
    userMood.associate = function(models) {
        userMood.belongsTo(models.User);
    };
    return userMood;
};