const { Router } = require("express");

const {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
  getAllProjectTeamMember,
} = require("../controllers/proejctListAPILogic");
const authenticate = require("../middlewares/authenticate");

const router = new Router();

router.use(authenticate);

router.get("/projectList", getAllProjectList);
router.post("/project", getProject);
router.post("/updateProject", updateProject);
router.post("/createProject", createProject);
router.delete("/deleteProject", deleteProject);
router.get("/getAllProjectTeamMember", getAllProjectTeamMember);

module.exports = router;
