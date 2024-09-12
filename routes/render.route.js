const express = require("express");
const router = new express.Router();

const { 
    renderRegister,
    renderLogin,
    renderTask,
    renderReport
} = require("../controllers/render.controller");

router.get("/", renderRegister);
router.get("/login", renderLogin);
router.get("/task", renderTask);
router.get("/report", renderReport);

module.exports = router;