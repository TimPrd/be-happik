const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(
  process.env.DB_DATABASE ? process.env.DB_DATABASE : 'admin',
  process.env.DB_USERNAME ? process.env.DB_USERNAME : 'admin',
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
  {
    dialect: 'postgres',
    host: process.env.DB_HOSTNAME ? process.env.DB_HOSTNAME : 'bh_postgres',
    port: process.env.DB_PORT ? process.env.DB_PORT : '5432',
    logging: false
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./User')(sequelize, Sequelize);

module.exports = db;