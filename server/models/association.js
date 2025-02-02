const sequelize = require("../utils/database");

// Import all models
const Project = require("./project");
const User = require("./user");
const Milestone = require("./milestone");
const Task = require("./task");
const Risk = require("./risk");

// Associations
// Project and User: Many-to-Many
Project.belongsToMany(User, {
  through: "ProjectTeamMembers",
  as: "teamMembers",
  foreignKey: "projectId",
});
User.belongsToMany(Project, {
  through: "ProjectTeamMembers",
  as: "projects",
  foreignKey: "userId",
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
};
