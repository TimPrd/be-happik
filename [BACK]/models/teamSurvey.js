'use strict';
module.exports = (sequelize, DataTypes) => {
    const Teamsurvey = sequelize.define('Teamsurvey', {
    }, {});
    Teamsurvey.associate = function(models) {
        Teamsurvey.belongsTo(models.Survey);
        Teamsurvey.belongsTo(models.Team);

    };
    return Teamsurvey;
};
