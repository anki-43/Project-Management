const { Router } = require("express");

const {
  registerUser,
  getAllUsers,
  login,
  logout,
  me,
} = require("../controllers/user");

const router = new Router();

router.post("/register", registerUser);
router.get("/getAllUsers", getAllUsers);
router.post("/login", login);
router.post("/logout", logout);
router.post("/me", me);

module.exports = router;
