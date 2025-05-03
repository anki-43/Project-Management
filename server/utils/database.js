const Sequelize = require("sequelize");

const sequelize = new Sequelize("projectmgt", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
  logging: () => true,
});

// sequelize.sync({ force: true });

module.exports = sequelize;
