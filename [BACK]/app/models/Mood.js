
module.exports = (sequelize, Sequelize) => {
    const Mood = sequelize.define('mood', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        date: Sequelize.STRING,
        mood: Sequelize.STRING,
    }, {
        timestamps: false
    });

    Mood.associate = models => {
        Mood.belongsTo(models.User , { as: 'userID' });
    };

    return Mood;
};
