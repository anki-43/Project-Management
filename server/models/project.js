const Sequelize = require("sequelize");
const Milestone = require("./milestone");
const Risk = require("./risk");
const Task = require("./task");
const sequelize = require("../utils/database");
const User = require("./user");

const Project = sequelize.define("project", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  projectName: Sequelize.STRING,
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  budget: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  projectManager: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Project;
