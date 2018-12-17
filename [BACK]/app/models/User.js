
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        lastname: Sequelize.STRING,
        firstname: Sequelize.STRING,
        email: {
            type : Sequelize.STRING,
            unique: true
        },
        birthday: Sequelize.DATE,
        avatar: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        timestamps: false
    });

    User.associate = models => {
        User.hasOne(models.Role, { as: 'role' });
    };

    return User;
};
