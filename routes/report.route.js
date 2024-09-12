const express = require("express");
const router = new express.Router();

const { 
    reports,
} = require("../controllers/report.controller");

router.get("/reports", reports);

module.exports = router;