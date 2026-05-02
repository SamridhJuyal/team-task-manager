const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const access = require("../middleware/projectAccess");

const {
  createProject,
  getProjects,
  addMember,
} = require("../controllers/projectController");

router.post("/", auth, role("admin"), createProject);
router.get("/", auth, getProjects);
router.post("/:id/add-member", auth, role("admin"), access, addMember);

module.exports = router;
