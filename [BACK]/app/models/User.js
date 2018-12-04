module.exports = function (sequelize, Sequelize) {
    return sequelize.define('user', {
      name: Sequelize.STRING,
    }, {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  };