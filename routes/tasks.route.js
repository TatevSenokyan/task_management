const express = require("express");
const router = new express.Router();

const { 
    createTask,
} = require("../controllers/tasks.controller");

router.post("/api/createTask", createTask);

module.exports = router;