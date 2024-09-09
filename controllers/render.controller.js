const Task = require("../models/Tasks");

exports.renderRegister = (req, res) => {
    res.render("routes/register");
}

exports.renderLogin = (req, res) => {
    res.render("routes/login");
}

exports.renderTask = async (_, res) => {
    const tasks =  await Task.find({}).exec();
    res.render("routes/task", {data: tasks});
}