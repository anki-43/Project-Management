const express = require("express");
const cors = require("cors");
const formidable = require("formidable");
const app = express();

const sequelize = require("./utils/database");

app.use(cors());

const projectRouter = require("./routes/projectList");
const uploadFileRouter = require("./routes/formidableRoute");
const userRoutes = require("./routes/userRoutes");

// /middleware to pass json in request body
app.use(express.json());

app.use("/proj", projectRouter);
app.use("/file", uploadFileRouter);
app.use("/user", userRoutes);

sequelize.sync().then(
  (res) => {
    console.log("success");
  },
  (err) => {
    console.log("err is", err);
  }
);

app.listen("8081", () => {
  console.log("server running at 8081");
});
