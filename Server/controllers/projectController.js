const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: "Title required" });
  }

  const project = await Project.create({
    title: req.body.title,
    createdBy: req.user.id,
    members: [req.user.id],
  });

  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({
    members: req.user.id,
  }).populate("members", "name email role");

  res.json(projects);
};

exports.addMember = async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: name || "New User",
      email,
      password: "123456",
      role: "member",
    });
  }

  const project = await Project.findById(req.params.id);

  if (!project.members.includes(user._id)) {
    project.members.push(user._id);
    await project.save();
  }

  const updated = await Project.findById(req.params.id).populate(
    "members",
    "name email role",
  );

  res.json(updated);
};
