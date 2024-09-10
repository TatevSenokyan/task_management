const Task = require("../models/Tasks");

exports.getTaskData = async (filter) => {
    const result = await Task.aggregate([
        {
          $facet: {
            tasks: [
              {
                $match: filter
              }
            ],
            statusCounts: [
              {
                $match: filter
              },
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 }
                }
              },
              {
                $project: {
                  _id: 0,
                  status: "$_id",
                  count: 1
                }
              }
            ]
          }
        }
      ]).exec();

    return {
        tasks: result[0].tasks,
        infoData: result[0].statusCounts
    };
}