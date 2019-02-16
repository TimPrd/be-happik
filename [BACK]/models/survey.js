'use strict';
module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define('Survey', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        open: DataTypes.BOOLEAN
    }, {});
    Survey.associate = function (models) {
        Survey.belongsTo(models.User, {as: "Author"});
    };
    return Survey;
};
