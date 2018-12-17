
module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define('mood', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        title: Sequelize.STRING,
        description: Sequelize.STRING,
    });

    Question.associate = models => {
        Question.belongsTo(models.User);
        Question.hasMany(models.Answer);

    };

    return Question;
};
