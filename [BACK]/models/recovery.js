'use strict';
module.exports = (sequelize, DataTypes) => {
    const Recovery = sequelize.define('Recovery', {
        token: DataTypes.STRING,
        destroyable: DataTypes.BOOLEAN
    }, {});
    Recovery.associate = function(models) {
        Recovery.belongsTo(models.User);
    };
    return Recovery;
};