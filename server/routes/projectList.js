const { Router } = require("express");

const {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
} = require("../controllers/proejctListAPILogic");

const router = new Router();

router.get("/projectList", getAllProjectList);
router.get("/project", getProject);
router.post("/updateProject", updateProject);
router.post("/createProject", createProject);
router.delete("/deleteProject", deleteProject);

module.exports = router;
