const Sequelize = require("sequelize");

const sequelize = new Sequelize("projectmgt", "root", "Ankit@7092", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
