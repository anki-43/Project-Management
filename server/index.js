const express = require("express");
const cors = require("cors");
const app = express();

const sequelize = require("./utils/database");

app.use(cors());

const router = require("./routes/projectList");

// /middleware to pass json in request body
app.use(express.json());

app.use(router);

sequelize.sync().then(
  (res) => {
    console.log("res is", res);
  },
  (err) => {
    console.log("err is", err);
  }
);

app.listen("8081", () => {
  console.log("server running at 8081");
});
