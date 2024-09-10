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
    const result = await Task.aggregate([
        {
          $group: {
            _id: "$status", // Group by the status field
            count: { $sum: 1 } // Count the number of documents in each group
          }
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            status: "$_id", // Rename _id field to status
            count: 1 // Include the count field
          }
        }
      ]);

    console.log("result", result)
    res.render("routes/task", {data: tasks});
}