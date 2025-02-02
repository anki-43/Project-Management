const { Project, Risk, Milestone, Task } = require("../models/association");

const getAllProjectList = async (req, res) => {
  const projects = await Project.findAll({
    include: [
      {
        model: Milestone,
        as: "milestones",
      },
      {
        model: Task,
        as: "tasks",
      },
      {
        model: Risk,
        as: "risks",
      },
    ],
  });
  res.send(projects.slice(0, 10));
};

const getProject = async (req, res) => {
  let project = await Project.findOne({
    where: {
      id: req.body.id,
    },
    include: [
      {
        model: Milestone,
        as: "milestones",
      },
      {
        model: Task,
        as: "tasks",
      },
      {
        model: Risk,
        as: "risks",
      },
    ],
  });
  console.log("project", project);
  res.json(project);
};

const updateProject = (req, res) => {
  let updatedProject = req.body.project;
  let projectId = req.body.id;
};

const createProject = async (req, res) => {
  let newProject = req.body.project;
  try {
    if (req?.body?.project) {
      const project = await Project.create();
      res.send({
        status: true,
        message: "Project created succesfully",
      });
    }
  } catch (err) {
    res.send({
      status: false,
      erroeMessage: err,
    });
  }
};

const deleteProject = (req, res) => {
  let projectId = req.body;
};

module.exports = {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
};
