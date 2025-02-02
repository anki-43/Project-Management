const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Project = require("./project");

const Task = sequelize.define("task", {
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
  description: {
    type: Sequelize.STRING,
  },
  assignedTo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  dueDate: {
    type: Sequelize.DATE,
  },
  priority: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  projectId: { type: Sequelize.INTEGER, allowNull: false },
});

// Task.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Task;
