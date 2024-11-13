const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Risk = sequelize.define("Risk", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
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
});

Risk.associate = (models) => {
  Risk.belongsTo(models.Project, { foreignKey: "projectId" });
};

module.exports = Risk;
