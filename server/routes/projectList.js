const { Router } = require("express");

const {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
} = require("../controllers/proejctListAPILogic");

const router = new Router();

router.get("/proj/projectList", getAllProjectList);
router.get("/proj/project", getProject);
router.post("/proj/updateProject", updateProject);
router.post("/proj/createProject", createProject);
router.delete("/proj/deleteProject", deleteProject);

module.exports = router;
