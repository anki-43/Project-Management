const { response } = require("express");
const User = require("../models/user");

const registerUser = async (req, res) => {
  console.log("1");
  try {
    if (req?.body?.username && req?.body?.email && req?.body?.password) {
      const user = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      req.session.userId = user.id;
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
      let user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        user = await User.findOne({
          where: {
            email: req.body.username,
          },
        });
      }

      if (user.password === req.body.password) {
        req.session.userId = user.id;
        res.send({
          status: true,
          user: {
            username: user.username,
            email: user.email,
          },
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
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).send({ message: "Logout successful" });
  });
};

const me = async (req, res) => {
  if (!req.session.userId) {
    res.send({
      status: false,
      user: null,
    });
  } else {
    let user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    res.send({
      status: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  login,
  logout,
  me,
};
