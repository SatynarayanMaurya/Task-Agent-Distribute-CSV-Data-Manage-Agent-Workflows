const Agent = require("../Models/agent.model")
const Task = require("../Models/task.model")

exports.getAllAgent = async(req,res)=>{
    try{
        const allAgent = await Agent.find({})
        return res.status(200).json({
            success:true,
            message:"All Agend fetched successfully",
            allAgent
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in getting all the agent",
            errorMessage:error?.message
        })
    }
}


exports.addAgent = async(req,res)=>{
    try{
        const {name,email,countryCode,phone,password} = req.body;
        if(!name || !email || !countryCode || !phone || !password){
            return res.status(400).json({
                success:false,
                message:"All Field are required !"
            })
        }
        const newAgent = await Agent.create({name,email,countryCode,phone,password});
        return res.status(201).json({
            success:true,
            message:"Agent Created successfully",
            newAgent
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in adding the agent",
            errorMessage:error.message
        })
    }
}


exports.editAgent = async (req,res)=>{
    try{
        const {name,phone,email,countryCode,agentId} = req.body;
        await Agent.findByIdAndUpdate(agentId,{$set:{name,phone,email,countryCode}})
        return res.status(200).json({
            success:true,
            message:"Agent Update Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in Updating the Agent !",
            errorMessage:error.message
        })
    }
}

exports.deleteAgent = async(req,res)=>{
    try{
        const agentId = req.query.agentId;
        if(!agentId){
            return res.status(400).json({
                success:false,
                message:"Agent Id not found"
            })
        }
        await Task.deleteMany({assignedTo:agentId})
        await Agent.findByIdAndDelete(agentId)
        return res.status(200).json({
            success:true,
            message:"Agent Deleted"
        })
        
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in deleting the agent",
            errorMessage:error?.message
        })
    }
}