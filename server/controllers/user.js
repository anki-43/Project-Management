const { response } = require("express");
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    if (req?.body?.username && req?.body?.email && req?.body?.password) {
      const user = await User.create({
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

const login = async (req, res) => {
  try {
    if (req?.body?.username && req?.body?.password) {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      console.log("here", user);

      if (user.password === req.body.password) {
        res.send({
          status: true,
          user: user,
        });
      } else {
        res.send({
          status: false,
          errorMessage: "wrong password",
        });
      }
    }
  } catch (err) {
    res.send({
      status: false,
      errorMessage: err,
    });
  }
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
