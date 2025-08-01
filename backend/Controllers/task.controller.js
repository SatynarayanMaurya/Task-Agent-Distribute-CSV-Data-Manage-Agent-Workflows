const Task = require("../Models/task.model")
const fs = require("fs");
const streamifier = require("streamifier");
const Agent = require("../Models/agent.model")
const csv = require("csv-parser");


exports.getAllTask = async(req,res)=>{
    try{
        const allTask = await Task.find({})
        return res.status(200).json({
            success:true,
            message:"All Task fetched successfully",
            allTask
        })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting all the task",
            errorMessage:error?.message
        })
    }
}


exports.uploadCsv = async (req, res) => {
  try {
    const file = req.files.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const results = [];

    // Create readable stream from the buffer
    streamifier.createReadStream(file.data)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        // Get all agents
        const agents = await Agent.find();
        if (agents.length === 0) {
          return res.status(400).json({ success: false, message: "No agents found in system." });
        }

        // Round-robin assign tasks
        const taskDocs = results?.map((row, index) => {
          const agent = agents?.[index % agents.length];
          return {
            firstName: row.FirstName || row.firstName,
            phone: row.Phone  || row.phone,
            notes: row.Notes  || row.notes,
            assignedTo: agent._id
          };
        });

        const savedTasks = await Task.insertMany(taskDocs);

        res.status(200).json({
          success: true,
          message: "CSV uploaded and tasks distributed successfully.",
          totalTasks: savedTasks.length,
        });
      });

  } catch (err) {
    console.error("CSV Upload Error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


exports.deleteTask = async (req,res)=>{
    try{
        const taskId = req.query.taskId;
        await Task.findByIdAndDelete(taskId)
        return res.status(200).json({
            success:true,
            message:"Task Deleted Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in deleting the task ",
            errorMessage:error?.message
        })
    }
}
