const { response } = require("express");
const { User } = require("../models/association");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Username, email, and password are required.",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "Email is already registered.",
      });
    }

    const user = await User.create({
      email,
      username,
      password,
    });
    req.session.userId = user.id;
    res.status(201).json({
      status: true,
      message: "User created successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to register user.",
      error: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const userList = users.map((el) => ({
      name: el.username,
    }));

    res.status(200).json({
      status: true,
      users: userList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to fetch users.",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "Username and password are required.",
      });
    }
    let user = await User.findOne({
      where: {
        username,
      },
    });

    // If not found by username, try email
    if (!user) {
      user = await User.findOne({ where: { email: username } });
    }

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
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
        errorMessage: "Invalid password",
      });
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
      console.error(err);
      return res.status(500).json({
        status: false,
        message: "Logout failed.",
      });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({
      status: true,
      message: "Logout successful.",
    });
  });
};

const me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        status: false,
        message: "Not authenticated.",
        user: null,
      });
    }

    const user = await User.findOne({ where: { id: req.session.userId } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
        user: null,
      });
    }

    res.status(200).json({
      status: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to fetch user details.",
      error: err.message,
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
