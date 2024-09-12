const Task = require("../models/Tasks");

exports.reports = async (req, res) => {
    console.log("Start Report Generation");
    const { startdate, enddate, assignee } = req.query;

    const query = {};

    if (startdate) query.completed = { ...query.completed, $gte: new Date(startdate).getTime() };

    if (assignee) query.assignee = assignee;

    if (enddate)  query.completed = { ...query.completed, $lte: new Date(enddate).getTime() };

    const data = await Task.find(query).select("-_id -updateHistory").exec();
    const jsonData = { 
        count: data.length,
        items: data 
    }

    if (data.length && startdate && enddate && enddate>=startdate) {
        jsonData.avgTime = Math.ceil((query.completed["$lte"] - query.completed["$gte"]) / (data.length*24*60*60*1000));
    }

    res.setHeader("Content-Disposition", "attachment; filename=report.json");
    res.setHeader("Content-Type", "application/json");
    res.send(jsonData);
}