const sequelize = require("./utils/database");
const { Project } = require("./models/project");
const { User } = require("./models/user");

const syncDatabase = async () => {
  try {
    await sequelize.authenticate(); // Check if the connection is successful
    console.log("Connection has been established successfully.");

    // Synchronize all models
    await sequelize.sync({ alter: true }); // Use { force: true } to drop existing tables and recreate them
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close(); // Close the connection when done
  }
};

syncDatabase();
