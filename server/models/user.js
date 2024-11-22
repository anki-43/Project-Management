const Sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
