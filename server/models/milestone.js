const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Milestone = sequelize.define("Milestone", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
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
});

Milestone.associate = (models) => {
  Milestone.belongsTo(models.Project, { foreignKey: "projectId" });
};

module.exports = Milestone;
