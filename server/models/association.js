const sequelize = require("../utils/database");

// Import all models
const Project = require("./project");
const User = require("./user");
const Milestone = require("./milestone");
const Task = require("./task");
const Risk = require("./risk");
const ProjectTeamMember = require("./projectTeamMember");

// Associations
// Project and User: Many-to-Many
Project.belongsToMany(User, {
  through: "ProjectTeamMember",
  foreignKey: "projectId",
  onDelete: "CASCADE",
});

User.belongsToMany(Project, {
  through: "ProjectTeamMember",
  foreignKey: "userId",
  onDelete: "CASCADE",
});

// Project and Milestone: One-to-Many
Project.hasMany(Milestone, { foreignKey: "projectId" });
Milestone.belongsTo(Project, { foreignKey: "projectId" });

// Project and Task: One-to-Many
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

// Project and Risk: One-to-Many
Project.hasMany(Risk, { foreignKey: "projectId" });
Risk.belongsTo(Project, { foreignKey: "projectId" });

// Export all models
module.exports = {
  sequelize,
  Project,
  User,
  Milestone,
  Task,
  Risk,
  ProjectTeamMember,
};
