const Sequelize = require("sequelize");

const sequelize = require("../util/database");

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
});

Project.associate = (models) => {
  Project.hasMany(models.Milestone, { foreignKey: "projectId" });
  Project.hasMany(models.Task, { foreignKey: "projectId" });
  Project.hasMany(models.Risk, { foreignKey: "projectId" });
  Project.belongsToMany(models.User, {
    through: "ProjectTeamMembers",
    as: "teamMembers",
    foreignKey: "projectId",
  });
  Project.belongsToMany(models.User, {
    through: "ProjectManagers",
    as: "projectManagers",
    foreignKey: "projectId",
  });
};

module.exports = Project;
