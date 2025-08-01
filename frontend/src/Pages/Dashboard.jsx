import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllTask, setAllAgent, setAllTask, setLoading, setUserDetails } from "../Redux/Slices/userSlice";
import { apiConnector } from "../Services/apiConnector";
import { agentEndpoints, taskEndpoints } from "../Services/apis";
import Spinner from "../Components/Spinner";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import EditAgent from "./EditAgent";
import DeleteAgent from "./DeleteAgent";

const Dashboard = () => {

  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.user.loading)
  const allAgent = useSelector((state)=>state.user.allAgent)
  const allTask = useSelector((state)=>state.user.allTask)
  const [isEditAgent , setIsEditAgent] = useState(false)
  const [isDeleteAgent, setIsDeleteAgent] = useState(false)
  const [agentId,setAgentId] = useState(null)

  const getAllAgent = async()=>{
    try{
      if(allAgent) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET", agentEndpoints.GET_ALL_AGENT)
      dispatch(setAllAgent(result?.data?.allAgent?.reverse()))
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      console.log("Error in getting all the agent : ",error)
    }
  }

  const getAllTask = async()=>{
    try{
      if(allTask) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET", taskEndpoints.GET_ALL_TASK)
      dispatch(setAllTask(result?.data?.allTask))
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      console.log("Error in getting all the agent : ",error)
    }
  }


  useEffect(()=>{
    getAllAgent();
    getAllTask()
  },[allAgent,allTask])

  const deleteTask =async (taskId)=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("DELETE",`${taskEndpoints.DELETE_TASK}?taskId=${taskId}`)
      toast.success(result?.data?.message || "Task Deleted Successfully")
      dispatch(clearAllTask())
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      console.log("Error in deleting the task : ",error)
    }
  }

  const editAgent = (agentId)=>{
    setIsEditAgent(true)
    setAgentId(agentId)
  }

  const deleteAgent = (agentId)=>{
    setIsDeleteAgent(true)
    setAgentId(agentId)
  }


  return (
    <div className="p-6 min-h-screen ">
      {loading && <Spinner/>}
      <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

        { allAgent?.length > 0 ?
          allAgent?.map((agent) => (
            <div
              key={agent._id}
              className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-indigo-700 mb-3">{agent.name}</h2>
                <div className="flex items-center gap-3">
                  <p onClick={()=>editAgent(agent?._id)} className="text-blue-500 hover:text-blue-600 cursor-pointer text-2xl transition-all duration-200"><CiEdit/></p>
                  <p onClick={()=>deleteAgent(agent?._id)} className="text-red-500 hover:text-red-600 cursor-pointer text-xl transition-all duration-200"><AiOutlineDelete/></p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">📧 {agent.email}</p>
              <p className="text-sm text-gray-500 mb-3">📱 {agent.phone}</p>

              <h3 className="font-medium text-gray-700 mb-2">Assigned Tasks : {allTask?.filter((task)=>task?.assignedTo === agent?._id)?.length}</h3>

              {allTask?.filter((task)=>task?.assignedTo === agent?._id)?.length > 0 ? (
                <ul className="space-y-1 max-h-40 overflow-y-auto scrollbar-slim pr-1">
                  {allTask?.filter((task)=>task?.assignedTo === agent?._id)?.map((task, index) => (
                    <li
                      key={task._id || index}
                      className="text-sm bg-gray-50 p-2 rounded border"
                    >
                      <strong>{task.firstName}</strong> - {task.phone}
                      <div className="  flex justify-between items-center">
                        <p className="text-xs text-gray-500 italic">{task.notes}</p>
                        <p onClick={()=>deleteTask(task?._id)} className="cursor-pointer text-red-400 hover:text-red-500 hover:text-[15px] transition-all duration-200"><AiOutlineDelete/></p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No tasks assigned.</p>
              )}
            </div>
          )):
          <div className="italic text-center ">No Agent Here</div>
        }
      </div>

      <>
        {
          isEditAgent && 
          <EditAgent closeModal = {()=>setIsEditAgent(false)} agentId={agentId}/>
        }
      </>

      <>
        {
          isDeleteAgent && 
          <DeleteAgent closeModal = {()=>setIsDeleteAgent(false)} agentId={agentId}/>
        }
      </>
    </div>
  );
};

export default Dashboard;
