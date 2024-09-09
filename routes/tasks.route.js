const express = require("express");
const router = new express.Router();

const { 
    createTask,
    taskDetails
} = require("../controllers/tasks.controller");

router.post("/api/createTask", createTask);
router.get("/taskDetails", taskDetails);

module.exports = router;