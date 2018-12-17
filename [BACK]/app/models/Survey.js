
module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define('user', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        start: Sequelize.DATE,
        end: Sequelize.STRING,
        isOpen: Sequelize.STRING
    }, {
        timestamps: false
    });

    Survey.associate = models => {
        Survey.belongsTo(models.User);
        Survey.hasMany(models.Answer);

    };
    return Survey;
};
