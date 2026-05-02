const Task = require("../models/Task");
const Project = require("../models/Project");

exports.getDashboard = async (req, res) => {
  try {
    // Get all projects user belongs to
    const projects = await Project.find({
      members: req.user.id,
    });

    const projectIds = projects.map((p) => p._id);

    // Get tasks of those projects
    const tasks = await Task.find({
      projectId: { $in: projectIds },
    });

    const total = tasks.length;

    const stats = {
      total,
      todo: 0,
      inProgress: 0,
      done: 0,
      overdue: 0,
    };

    const now = new Date();

    tasks.forEach((task) => {
      if (task.status === "todo") stats.todo++;
      if (task.status === "in-progress") stats.inProgress++;
      if (task.status === "done") stats.done++;

      if (
        task.dueDate &&
        new Date(task.dueDate) < now &&
        task.status !== "done"
      ) {
        stats.overdue++;
      }
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
