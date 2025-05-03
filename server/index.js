const express = require("express");
const cors = require("cors");
const formidable = require("formidable");

require("dotenv").config();

const session = require("express-session");
const Redis = require("ioredis");
const { RedisStore } = require("connect-redis");
const app = express();

const sequelize = require("./utils/database");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // Allow cookies or credentials
  })
);

const redis = new Redis({});

redis.on("connect", () => console.log("Connected to Redis!"));
redis.on("error", (err) => console.log("Redis Client Error", err));

app.use(
  session({
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    secret: "pit_rediskey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const userRoutes = require("./routes/userRoutes");
const projectRouter = require("./routes/projectList");
const uploadFileRouter = require("./routes/formidableRoute");

// /middleware to pass json in request body
app.use(express.json());

app.use("/user", userRoutes);
app.use("/proj", projectRouter);
app.use("/file", uploadFileRouter);

sequelize.sync({ alter: true }).then(
  (res) => {
    console.log("success");
  },
  (err) => {
    console.log("err is", err);
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
