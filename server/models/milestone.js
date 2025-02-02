const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Project = require("./project");

const Milestone = sequelize.define("milestone", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increment for integers
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.STRING,
  },
  projectId: { type: Sequelize.INTEGER, allowNull: false },
});

// Milestone.belongsTo(Project, { as: "projects", foreignKey: "projectId" });

module.exports = Milestone;
