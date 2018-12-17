
module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define('mood', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        result: Sequelize.STRING,
    });

    Answer.associate = models => {
        Answer.belongsTo(models.User);
    };

    return Answer;
};
