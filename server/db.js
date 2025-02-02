const sequelize = require("./utils/database");
const {
  User,
  Project,
  Milestone,
  Task,
  Risk,
} = require("./models/association");
const { faker } = require("@faker-js/faker");

async function seedDatabase() {
  try {
    // Sync database (adjust options based on your needs)
    await sequelize.sync({ force: true });
    console.log("Database synced!");

    // Create mock users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        username: faker.internet.username(),
        password: faker.internet.password(),
      });
      users.push(user);
    }
    console.log("Users created!");

    // Create mock projects
    const projects = [];
    for (let i = 0; i < 5; i++) {
      const project = await Project.create({
        id: i + 1,
        projectName: faker.company.name(),
        description: faker.lorem.sentence(),
        startDate: faker.date.past().toISOString().split("T")[0],
        endDate: faker.date.future().toISOString().split("T")[0],
        budget: faker.finance.amount(10000, 100000, 2),
        projectManager: faker.internet.username(),
      });
      projects.push(project);
    }
    console.log("Projects created!");

    // Add users to projects (Many-to-Many)
    // for (const project of projects) {
    //   const randomUsers = faker.helpers.arrayElements(users, 3); // Pick 3 random users
    //   await project.addTeamMembers(randomUsers);
    // }
    // console.log("Users added to projects!");

    // Create milestones, tasks, and risks for each project
    for (const project of projects) {
      // Milestones
      for (let i = 0; i < 3; i++) {
        await project.createMilestone({
          name: faker.lorem.words(3),
          dueDate: faker.date.future().toISOString().split("T")[0],
          status: faker.helpers.arrayElement([
            "Pending",
            "Completed",
            "In Progress",
          ]),
        });
      }

      // Tasks
      for (let i = 0; i < 5; i++) {
        await project.createTask({
          name: faker.lorem.words(2),
          status: faker.helpers.arrayElement([
            "Pending",
            "Completed",
            "In Progress",
          ]),
          dueDate: faker.date.future().toISOString().split("T")[0],
          priority: faker.helpers.arrayElement(["Low", "Medium", "High"]),
          description: faker.lorem.sentence(),
          assignedTo: faker.internet.username(),
        });
      }

      // Risks
      for (let i = 0; i < 2; i++) {
        await project.createRisk({
          description: faker.lorem.sentence(),
          impact: faker.lorem.sentence(),
          mitigationPlan: faker.lorem.sentence(),
        });
      }
    }
    console.log("Milestones, tasks, and risks created!");

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
