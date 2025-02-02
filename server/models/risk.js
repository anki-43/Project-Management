const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Project = require("./project");

const Risk = sequelize.define("risk", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increment for integers
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  impact: {
    type: Sequelize.STRING,
  },
  mitigationPlan: {
    type: Sequelize.STRING,
  },
  projectId: { type: Sequelize.INTEGER, allowNull: false },
});

// Risk.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Risk;
