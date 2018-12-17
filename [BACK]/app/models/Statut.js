
module.exports = (sequelize, Sequelize) => {
    const Statut = sequelize.define('statut', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        date: Sequelize.STRING,
        statut: Sequelize.STRING,
    }, {
        timestamps: false
    });

    Statut.associate = models => {
        Statut.belongsTo(models.User);
    };

    return Statut;
};
