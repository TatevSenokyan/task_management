const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = Schema({
    activity: {type: String, required: true, lowercase: true},
    author: {type: String, required: true, lowercase: true},
    description: {type: String, required: true, lowercase: true},
  },{ _id : false });

const taskSchema = new Schema(
    {
        title: {type: String, required: [true, "task title is required"], lowercase: true},
        description: {type: String, required: true, lowercase: true},
        assignee: {type: String, required: true, lowercase: true},
        priority: {type: String, required: true, enum: ["high", "low", "normal"]},
        status: {type: String, required: true, enum: ["completed", "to do", "in progress"], default: "to do"},
        created: {type: Date, default: Date.now, get: (v) => new Date(v).toLocaleString()},
        deadline: {type: Date, required: true, get: (v) => new Date(v).toLocaleString()},
        updateHistory: [activitySchema] 
    }, 
    {versionKey: false}  
);

module.exports = mongoose.model("Tasks", taskSchema);