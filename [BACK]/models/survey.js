'use strict';
module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define('Survey', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM('done', 'waiting', 'expired'),
            defaultValue: 'waiting'
        },
    }, {});
    Survey.associate = function (models) {
        Survey.belongsTo(models.User, {as: "Author"});
    };
    return Survey;
};
