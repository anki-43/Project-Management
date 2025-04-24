const { Router } = require("express");

const {
  registerUser,
  getAllUsers,
  login,
  logout,
  me,
} = require("../controllers/user");
const authenticate = require("../middlewares/authenticate");

const router = new Router();

router.post("/register", registerUser);
router.post("/login", login);

router.use(authenticate);

router.get("/me", me);
router.get("/logout", logout);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
