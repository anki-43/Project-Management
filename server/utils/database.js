const Sequelize = require("sequelize");

const sequelize = new Sequelize("projectmgt", "root", "Ankit@7092", {
  dialect: "mysql",
  host: "localhost",
  logging: () => true,
});

// sequelize.sync({ force: true });

module.exports = sequelize;
