'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        seen: DataTypes.BOOLEAN,
        title: DataTypes.STRING,
        body: DataTypes.STRING,
    }, {});
    Notification.associate = function(models) {
        Notification.belongsTo(models.User ,{as : "Sender"});
        Notification.belongsTo(models.User, {as : "User"});
    };
    return Notification;
};