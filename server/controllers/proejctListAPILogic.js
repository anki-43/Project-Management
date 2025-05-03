const {
  Project,
  Risk,
  Milestone,
  Task,
  User,
  sequelize,
} = require("../models/association");

const getAllProjectList = async (req, res) => {
  const userId = req.session.userId; // Get the logged-in user's ID
  try {
    const projects = await Project.findAll({
      where: { creatorId: userId },
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

    res.status(200).json({
      status: true,
      projects: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to fetch project list.",
      error: err.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const userId = req.session.userId; // Get the logged-in user's ID
    const projectId = req.body.id;

    let project = await Project.findOne({
      where: {
        id: projectId,
        creatorId: userId, // Ensure the creatorId matches the logged-in user
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

    if (!project) {
      return res.status(404).json({
        status: false,
        errorMessage: "Project not found.",
      });
    }

    res.status(200).json({
      status: true,
      project: project,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to fetch project",
      error: err.message,
    });
  }
};

const updateProject = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const project = req.body;

    if (!project || !project.id) {
      return res.status(400).json({
        status: false,
        message: "Invalid project data.",
      });
    }

    const [results, _] = await sequelize.query(
      "UPDATE projects SET projectName = $1, description = $2, startDate =  $3, endDate = $4, projectManager = $5, budget = $6, teamMembers = $7 WHERE id = $8",
      {
        bind: [
          project.projectName,
          project.description,
          project.startDate,
          project.endDate,
          project.projectManager,
          project.budget,
          project.teamMembers,
          project.id,
        ],
      }
    );

    // this error cannot be used bc for change in task/milestone/risk,
    // there wont be any rows affected and so is the case for all commented errors below
    // to avoid this, we need to calculae the delta of the tasks/milestones/risk and then update them

    // if (results.affectedRows === 0) {
    //   await t.rollback();
    //   return res.status(404).json({
    //     status: false,
    //     message: "Project not found.",
    //   });
    // }

    //update/insert tasks
    for (const task of project.tasks) {
      try {
        let taskExists = await Task.findByPk(task.id);
        if (taskExists) {
          const [taskResult, _] = await sequelize.query(
            "UPDATE tasks SET name = $1, dueDate = $2, status =  $3, description = $4, assignedTo = $5, priority = $6 WHERE id = $7",
            {
              bind: [
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
          // if (taskResult.affectedRows === 0) {
          //   throw new Error("Failed to update task.");
          // }
        } else {
          const [taskResult, _] = await sequelize.query(
            "INSERT INTO tasks (name, dueDate, status, description , assignedTo , priority,  projectId) VALUES($1,$2,$3,$4,$5,$6,$7)",
            {
              bind: [
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
          // if (taskResult.affectedRows === 0) {
          //   throw new Error("Failed to insert task.");
          // }
        }
      } catch (err) {
        await t.rollback();
        return res.status(500).json({
          status: false,
          erroeMessage: err.message,
        });
      }
    }

    //update/insert milestones
    for (const milestone of project.milestones) {
      try {
        let milestoneExists = await Milestone.findByPk(milestone.id);
        if (milestoneExists) {
          const [milestoneResult, _] = await sequelize.query(
            "UPDATE milestones SET name = $1, dueDate = $2, status =  $3 WHERE id = $4",
            {
              bind: [
                milestone.name,
                milestone.dueDate,
                milestone.status,
                milestone.id,
              ],
            }
          );
          // if (milestoneResult.affectedRows === 0) {
          //   throw new Error("Failed to update milestone.");
          // }
        } else {
          const [milestoneResult, _] = await sequelize.query(
            "INSERT INTO milestones (name, dueDate, status, projectId) VALUES($1,$2,$3,$4)",
            {
              bind: [
                milestone.name,
                milestone.dueDate,
                milestone.status,
                project.id,
              ],
            }
          );
          // if (milestoneResult.affectedRows === 0) {
          //   throw new Error("Failed to insert milestone.");
          // }
        }
      } catch (err) {
        await t.rollback();
        return res.status(500).json({
          status: false,
          erroeMessage: err.message,
        });
      }
    }

    //update/insert risks
    for (const risk of project.risks) {
      try {
        let riskExists = await Risk.findByPk(risk.id);
        if (riskExists) {
          const [riskResult, _] = await sequelize.query(
            "UPDATE risks SET description = $1, mitigationPlan = $2, impact =  $3 WHERE id = $4",
            {
              bind: [
                risk.description,
                risk.mitigationPlan,
                risk.impact,
                risk.id,
              ],
            }
          );
          // if (riskResult.affectedRows === 0) {
          //   throw new Error("Failed to update risk.");
          // }
        } else {
          const [riskResult, _] = await sequelize.query(
            "INSERT INTO risks (description, mitigationPlan, impact, projectId) VALUES($1,$2,$3,$4)",
            {
              bind: [
                risk.description,
                risk.mitigationPlan,
                risk.impact,
                project.id,
              ],
            }
          );
          // if (riskResult.affectedRows === 0) {
          //   throw new Error("Failed to insert milestone.");
          // }
        }
      } catch (err) {
        await t.rollback();
        return res.status(500).json({
          status: false,
          erroeMessage: err.message,
        });
      }
    }

    await t.commit();
    res.status(201).json({
      status: true,
      message: "Project updated succesfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: err,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    if (!projectData) {
      return res.status(400).json({
        status: false,
        message: "Invalid project data.",
      });
    }

    const pro = await Project.create(
      {
        projectName: projectData.projectName,
        description: projectData.description,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        projectManager: projectData.projectManager,
        budget: projectData.budget,
        teamMembers: projectData.teamMembers.join(","),
        milestones: projectData.milestones,
        tasks: projectData.tasks,
        risks: projectData.risks,
        creatorId: req.session.userId,
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
    res.status(201).json({
      status: true,
      message: "Project created succesfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to create project.",
      error: err.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Project ID is required.",
      });
    }
    const deleted = await Project.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to delete project.",
      error: err.message,
    });
  }
};

const getAppointments = async (req, res) => {
  const userId = req.session.userId; // Get the logged-in user's ID

  try {
    const milestones = await Milestone.findAll({
      include: {
        model: Project,
        where: { creatorId: userId }, // Filter by creatorId
        attributes: [], // Exclude project details from the response
      },
    });
    const tasks = await Task.findAll({
      include: {
        model: Project,
        where: { creatorId: userId }, // Filter by creatorId
        attributes: [], // Exclude project details from the response
      },
    });

    res.status(200).json({
      status: true,
      list: {
        milestones,
        tasks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      errorMessage: "Failed to fetch appointments.",
      error: err.message,
    });
  }
};

module.exports = {
  getAllProjectList,
  getProject,
  updateProject,
  createProject,
  deleteProject,
  getAppointments,
};
