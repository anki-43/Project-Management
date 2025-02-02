const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../utils/database");

const ProjectTeamMembers = sequelize.define("ProjectTeamMembers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  projectId: {
    type: Sequelize.INTEGER,
    references: {
      model: "projects", // Table name
      key: "id", // Primary key in the projects table
    },
    onDelete: "CASCADE",
  },
  userId: {
    type: Sequelize.DataTypes.UUID,
    references: {
      model: "users", // Table name
      key: "id", // Primary key in the users table
    },
    onDelete: "CASCADE",
  },
});

module.exports = ProjectTeamMembers;
