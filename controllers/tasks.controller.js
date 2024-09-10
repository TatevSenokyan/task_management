const Task = require("../models/Tasks");
const { getTaskData } = require("../handlers/taskDataHandler");

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
      console.log("Task Successfully created");
      res.redirect("/task");
    } catch (err) {
        console.log(`Creating Task err---${err.message}`);
        res.status(500).json({"message": "internal server error"});
    }
}

exports.taskDetails = async(req, res) => {
  console.log("Start Get TaskDetails", req.query);
  const {id} = req.query;
  const task = await Task.findOne({_id: id}).exec();
  res.render("routes/taskDetails", {taskData: task});
}

exports.taskUpdate = async(req, res) => {
  console.log("Start Task Update", req.body, req.url, req.cookies['name']);
  const { status, comment } = req.body;
  const {id} = req.query;
  console.log("id", id)
  const author = req.cookies['name'];
  const updateObject = {};
  let activity =  "";
  let description = `${author}`;
  
  if (status) {
    activity += "change status,";
    updateObject.$set = { status };
    description += `change status to ${status},`;
  }

  if (comment) {
    activity += "add comment";
    description += `commented ${comment}`
  }

  updateObject.$push = { updateHistory: {
     author,
     activity,
     description
  }};
  
  console.log("updateObject", updateObject)
  try {
    await Task.findOneAndUpdate({_id: id}, updateObject, { new: true });
    res.redirect(`/taskDetails?id=${id}`);
  } catch (err) {
     console.log(`Task update error---${err.message}`);
  }
}