const express = require("express");
const router = new express.Router();

const { 
    register, 
    login,
} = require("../controllers/users.controller");

router.post("/api/register", register);
router.post("/api/login", login);

module.exports = router;