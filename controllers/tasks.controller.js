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
        deadline: new Date(deadline).getTime()
      })

      await newTask.save();
      console.log("Task Successfully created");
      res.redirect("/task");
    } catch (err) {
        console.log(`Creating Task err---${err.message}`);
    }
}

exports.taskDetails = async(req, res) => {
  console.log("Start Get TaskDetails", req.query);
  const {id} = req.query;
  const task = await Task.findOne({_id: id}).exec();
  res.render("routes/taskDetails", {taskData: task});
}

exports.taskUpdate = async(req, res) => {
  console.log("Start Task Update");
  const { status, comment } = req.body;
  const { id } = req.query;
  const author = req.cookies["name"];
  const updateObject = {};
  let activity =  "";
  let description = `${author}--`;
  
  if (status) {
    activity += "change status,";
    updateObject.$set = { status, completed: status==="completed" ? Date.now() : null };
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

  try {
    await Task.findOneAndUpdate({_id: id}, updateObject, { new: true });
    res.redirect(`/taskDetails?id=${id}`);
  } catch (err) {
     console.log(`Task update error---${err.message}`);
  }
}