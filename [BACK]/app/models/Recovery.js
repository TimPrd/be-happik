
module.exports = (sequelize, Sequelize) => {
    const Recovery = sequelize.define('user', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        token: Sequelize.STRING
    });

    Recovery.associate = models => {
        Recovery.belongsTo(models.User, { as: 'user' });
    };

    return Recovery;
};
