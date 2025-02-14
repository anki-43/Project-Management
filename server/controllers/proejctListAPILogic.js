const {
  Project,
  Risk,
  Milestone,
  Task,
  User,
  ProjectTeamMember,
} = require("../models/association");

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

  res.json({
    status: true,
    projects: projects,
  });
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

const updateProject = async (req, res) => {
  let projectId = req.body.id;
  try {
    if (req?.body) {
      const pro = await Project.update(
        {
          projectName: req.body.projectName,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          projectManager: req.body.projectManager,
          budget: req.body.budget,
          teamMembers: req.body.teamMembers.join(""),
          milestones: req.body.milestones,
          tasks: req.body.tasks,
          risks: req.body.risks,
        },
        {
          include: [
            {
              model: Milestone,
              as: "milestones",
            },
            {
              model: Risk,
              as: "risks",
            },
            {
              model: Task,
              as: "tasks",
            },
          ],
        }
      );
      res.json({
        status: true,
        message: "Project created succesfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      erroeMessage: err,
    });
  }
};

const createProject = async (req, res) => {
  try {
    if (req?.body) {
      const pro = await Project.create(
        {
          projectName: req.body.projectName,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          projectManager: req.body.projectManager,
          budget: req.body.budget,
          teamMembers: req.body.teamMembers.join(""),
          milestones: req.body.milestones,
          tasks: req.body.tasks,
          risks: req.body.risks,
        },
        {
          include: [
            {
              model: Milestone,
              as: "milestones",
            },
            {
              model: Risk,
              as: "risks",
            },
            {
              model: Task,
              as: "tasks",
            },
          ],
        }
      );
      res.json({
        status: true,
        message: "Project created succesfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      erroeMessage: err,
    });
  }
};

const deleteProject = (req, res) => {
  let projectId = req.body;
};

const getAllProjectTeamMember = async (req, res) => {
  const Members = await ProjectTeamMember.findAll({
    include: [
      {
        model: User,
      },
    ],
  });
  res.send(Members);
};

module.exports = {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
  getAllProjectTeamMember,
};
