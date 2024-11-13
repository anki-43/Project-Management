const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Task = sequelize.define("Task", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
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
});

Task.associate = (models) => {
  Task.belongsTo(models.Project, { foreignKey: "projectId" });
};

module.exports = Task;
