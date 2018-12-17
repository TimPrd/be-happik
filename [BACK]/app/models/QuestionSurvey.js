
module.exports = (sequelize, Sequelize) => {
    const QuestionSuvey = sequelize.define('mood', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        }
    });

    QuestionSuvey.associate = models => {
        QuestionSuvey.belongsTo(models.Question);
        QuestionSuvey.belongsTo(models.Survey);

    };

    return Question;
};
