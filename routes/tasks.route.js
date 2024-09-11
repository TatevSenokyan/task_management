const express = require("express");
const router = new express.Router();

const { authenticate } = require("../middleware/authenticate");

const { 
    createTask,
    taskDetails,
    taskUpdate
} = require("../controllers/tasks.controller");

router.post("/createTask", authenticate, createTask);
router.post("/taskUpdate", authenticate, taskUpdate);
router.get("/taskDetails", taskDetails);

module.exports = router;