const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  try {
    if (req?.body?.username && req?.body?.email && req?.body?.password) {
      const user = await User.create({
        // id: uuidv4(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      console.log(user);
      res.send({
        status: true,
        message: "user created succesfully",
      });
    }
  } catch (err) {
    res.send({
      status: false,
      erroeMessage: err,
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
};

const login = (req, res) => {
  req.json({});
};

const logout = (req, res) => {
  req.json({});
};

const me = (req, res) => {
  req.json({});
};

module.exports = {
  registerUser,
  getAllUsers,
  login,
  logout,
  me,
};
