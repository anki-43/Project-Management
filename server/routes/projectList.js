const { Router } = require("express");

const {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
  getAppointments,
} = require("../controllers/proejctListAPILogic");
const authenticate = require("../middlewares/authenticate");

const router = new Router();

router.use(authenticate);

router.get("/projectList", getAllProjectList);
router.post("/project", getProject);
router.post("/updateProject", updateProject);
router.post("/createProject", createProject);
router.post("/deleteProject", deleteProject);
router.get("/getAppointments", getAppointments);

module.exports = router;
