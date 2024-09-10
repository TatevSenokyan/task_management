const express = require("express");
const router = new express.Router();

const { 
    createTask,
    taskDetails,
    taskUpdate
} = require("../controllers/tasks.controller");

router.post("/api/createTask", createTask);
router.post("/taskUpdate", taskUpdate);
router.get("/taskDetails", taskDetails);

module.exports = router;