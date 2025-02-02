const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Attachment = sequelize.define("Attachment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  fileName: {
    type: Sequelize.STRING,
  },
  filePath: {
    type: Sequelize.STRING, // Path to the file in the server or URL if using cloud storage
  },
  fileType: {
    type: Sequelize.STRING,
  },
});

Attachment.associate = (models) => {
  Attachment.belongsTo(models.Project, { foreignKey: "projectId" });
};

module.exports = Attachment;
