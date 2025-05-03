const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    database: process.env.DB_NAME,
    dialect: "postgres",
    host: process.env.DB_URL,
    logging: () => true,
  }
);

module.exports = sequelize;
