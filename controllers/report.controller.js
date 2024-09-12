
exports.reports = async (req, res) => {
    console.log("Start Report Generation", req.query);
    const { startdate, deadline, assignee } = req.query;

    const data = {};
    const jsonData = JSON.stringify(data, null, 2);
    
    res.setHeader('Content-Disposition', 'attachment; filename=report.json');
    res.setHeader('Content-Type', 'application/json');

    res.send(jsonData);
  
}