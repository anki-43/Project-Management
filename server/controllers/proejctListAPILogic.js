const {
  Project,
  Risk,
  Milestone,
  Task,
  User,
  sequelize,
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
  const t = await sequelize.transaction();

  try {
    const project = req.body;
    if (req?.body) {
      const [results, _] = await sequelize.query(
        "UPDATE projects SET projectName = ?, description = ?, startDate =  ?, endDate = ?, projectManager = ?, budget = ?, teamMembers = ? WHERE id = ?",
        {
          replacements: [
            project.projectName,
            project.description,
            project.startDate,
            project.endDate,
            project.projectManager,
            project.budget,
            project.teamMembers.join(""),
            project.id,
          ],
        }
      );

      project.tasks.forEach(async (task) => {
        let taskExists = Task.findByPk(task.id);
        if (taskExists) {
          const [taskResult, _] = await sequelize.query(
            "UPDATE tasks SET name = ?, dueDate = ?, status =  ?, description = ?, assignedTo = ?, priority = ? WHERE id = ?",
            {
              replacements: [
                task.name,
                task.dueDate,
                task.status,
                task.description,
                task.assignedTo,
                task.priority,
                task.id,
              ],
            }
          );
          if (taskResult.affectedRows === 0) {
            console.log("project not found. Task");
            // await t.rollback();
            return;
          }
        } else {
          const [taskResult, _] = await sequelize.query(
            "INSERT INTO tasks (name, dueDate, status, description , assignedTo , priority,  projectId) VALUES(?,?,?,?,?,?,?)",
            {
              replacements: [
                task.name,
                task.dueDate,
                task.status,
                task.description,
                task.assignedTo,
                task.priority,
                project.id,
              ],
            }
          );
          if (taskResult.affectedRows === 0) {
            console.log("project not found. Task");
            // await t.rollback();
            return;
          }
        }
      });

      project.milestones.forEach(async (milestone) => {
        let milestoneExists = Milestone.findByPk(milestone.id);
        if (milestoneExists) {
          const [milestoneResult, _] = await sequelize.query(
            "UPDATE milestones SET name = ?, dueDate = ?, status =  ? WHERE id = ?",
            {
              replacements: [
                milestone.name,
                milestone.dueDate,
                milestone.status,
                milestone.id,
              ],
            }
          );
          if (milestoneResult.affectedRows === 0) {
            console.log("project not found. Milestone");
            // await t.rollback();
            return;
          }
        } else {
          const [milestoneResult, _] = await sequelize.query(
            "INSERT INTO milestones (name, dueDate, status, projectId) VALUES(?,?,?,?)",
            {
              replacements: [
                milestone.name,
                milestone.dueDate,
                milestone.status,
                project.id,
              ],
            }
          );
          if (milestoneResult.affectedRows === 0) {
            console.log("project not found. Milestone");
            // await t.rollback();
            return;
          }
        }
      });

      project.risks.forEach(async (risk) => {
        let riskExists = Risk.findByPk(risk.id);
        if (riskExists) {
          const [riskResult, _] = await sequelize.query(
            "UPDATE risks SET description = ?, mitigationPlan = ?, impact =  ? WHERE id = ?",
            {
              replacements: [
                risk.description,
                risk.mitigationPlan,
                risk.impact,
                risk.id,
              ],
            }
          );
          if (riskResult.affectedRows === 0) {
            console.log("project not found. Risk");
            // await t.rollback();
            return;
          }
        } else {
          const [riskResult, _] = await sequelize.query(
            "INSERT INTO risks (description, mitigationPlan, impact, projectId) VALUES(?,?,?,?)",
            {
              replacements: [
                risk.description,
                risk.mitigationPlan,
                risk.impact,
                project.id,
              ],
            }
          );
          if (riskResult.affectedRows === 0) {
            console.log("project not found. Risk");
            // await t.rollback();
            return;
          }
        }
      });

      await t.commit();
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

const deleteProject = async (req, res) => {
  try {
    console.log(req.body);
    await Project.destroy({
      where: {
        id: req.body.id,
      },
    });

    res.json({
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      error: err,
    });
  }
};

module.exports = {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
};
