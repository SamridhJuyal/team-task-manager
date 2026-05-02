const Project = require("../models/Project");

module.exports = async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const isMember = project.members.includes(req.user.id);

  if (!isMember) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
