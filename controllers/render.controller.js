const { getTaskData } = require("../handlers/taskDataHandler");

exports.renderRegister = (req, res) => {
    res.render("routes/register");
}

exports.renderLogin = (req, res) => {
    res.render("routes/login");
}

exports.renderReport = (req, res) => {
    res.render("routes/reports");
}

exports.renderTask = async (req, res) => {
    console.log('renderTask')
    const { state } = req.query; 
    const filter = state ? {status: state} : {};
    const { tasks, infoData } = await getTaskData(filter);

    res.render("routes/task", {tasks, infoData});
}