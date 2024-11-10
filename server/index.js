const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const router = require("./routes/projectList");

// /middleware to pass json in request body
app.use(express.json());

app.use(router);

app.listen("8081", () => {
  console.log("server running at 8081");
});
