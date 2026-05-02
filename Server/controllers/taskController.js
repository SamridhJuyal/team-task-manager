const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, projectId } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const task = await Task.create(req.body);

  const populated = await task.populate("assignedTo", "name email");

  res.status(201).json(populated);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({
    projectId: req.params.projectId,
  }).populate("assignedTo", "name email");

  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  Object.assign(task, req.body);

  await task.save();

  const updated = await task.populate("assignedTo", "name email");

  res.json(updated);
};
