
const express = require("express");
const { signupController, loginController, getUserDetails } = require("../Controllers/authentication.controller");
const { authMiddleware } = require("../Middlewares/auth.middleware");
const { getAllAgent, addAgent, editAgent, deleteAgent } = require("../Controllers/agent.controller");
const { getAllTask, uploadCsv, deleteTask } = require("../Controllers/task.controller");
const router = express.Router();



router.post("/signup",signupController)
router.post("/login",loginController)
router.get("/get-user-details",authMiddleware,getUserDetails)

router.get("/get-all-agent",authMiddleware,getAllAgent)
router.post("/add-agent",authMiddleware,addAgent)
router.put("/update-agent",authMiddleware,editAgent)
router.delete("/delete-agent",authMiddleware,deleteAgent)

router.get("/get-all-task",authMiddleware,getAllTask)
router.post("/upload-csv",authMiddleware,uploadCsv);
router.delete("/delete-task",authMiddleware,deleteTask);

module.exports = router