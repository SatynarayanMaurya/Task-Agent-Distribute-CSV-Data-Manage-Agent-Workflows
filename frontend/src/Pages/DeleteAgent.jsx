import { useDispatch, useSelector } from 'react-redux';
import { clearAllAgent, setLoading } from '../Redux/Slices/userSlice';
import { apiConnector } from '../Services/apiConnector';
import { agentEndpoints } from '../Services/apis';
import { toast } from 'react-toastify';
import { GoAlert } from "react-icons/go";
import Spinner from '../Components/Spinner';
function DeleteAgent({agentId,closeModal}) {

    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.user.loading)

    const deleteAgent = async()=>{
        try{
            dispatch(setLoading(true))
            const result = await apiConnector("DELETE",`${agentEndpoints.DELETE_AGENT}?agentId=${agentId}`,)
            toast.success(result?.data?.message || "Agent Deleted")
            dispatch(clearAllAgent())
            dispatch(setLoading(false))
            closeModal()
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message || "Error in deleting the Agent")
            console.log("Error in deleting the Agent : ",error)
        }
    }

  return (
    <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center bg-black/30'>
        {loading&& <Spinner/>}
      <div className='lg:w-[25vw] w-[90vw] lg:h-[40vh] h-[35vh] bg-white p-4  rounded-xl'>
        <div className='flex justify-center items-center'>
            <p className='text-red-500 p-3 rounded-full bg-red-100 text-xl text-center'><GoAlert/></p>
        </div>
        <p className='text-center mt-2 text-xl font-semibold'>Are You Sure</p>
        <p className='text-center mt-2'>This action cannot be undone. All Data <br /> associated with this agent will be lost.</p>

        <div className='flex flex-col gap-3 mt-6'>
            <button onClick={deleteAgent} className='font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-200 py-2 rounded-lg w-full cursor-pointer'>Delete</button>
            <button onClick={closeModal} className='font-semibold  border py-2 rounded-lg w-full cursor-pointer'>Cancel</button>
        </div>


      </div>
    </div>
  )
}

export default DeleteAgent
