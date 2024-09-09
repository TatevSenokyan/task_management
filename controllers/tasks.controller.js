const Task = require("../models/Tasks");

exports.createTask = async (req, res) => {
    console.log("Start Create Task");

    const { title, description, priority, status, assignee, deadline } = req.body;

    try {
      const newTask = new Task({
        title,
        description,
        priority,
        status,
        assignee,
        deadline
      })

      await newTask.save();
      console.log("Task Successfully created")
      res.render("routes/task", {data: await Task.find({})});
    } catch (err) {
        console.log(`Creating Task err---${err.message}`);
        res.status(500).json({"message": "internal server error"});
    }
}

exports.taskDetails = async(req, res) => {
  console.log("Start Get TaskDetails", req.query);
  const {id} = req.query;
  const task = await Task.findOne({_id: id}).exec();
  console.log("task", task)
  res.render("routes/taskDetails", {taskData: task});
}