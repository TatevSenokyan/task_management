const Task = require("../models/Tasks");

exports.renderRegister = (req, res) => {
    res.render("routes/register");
}

exports.renderLogin = (req, res) => {
    res.render("routes/login");
}

exports.renderTask = async (req, res) => {
    console.log('renderTask')
    const {state} = req.query; 
    const filter = state ? {status: state} : {};
    const tasks =  await Task.find(filter).exec();
    res.render("routes/task", {data: tasks});
}