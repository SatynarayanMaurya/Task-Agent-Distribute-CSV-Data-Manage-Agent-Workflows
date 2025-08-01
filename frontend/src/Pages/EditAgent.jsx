import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllAgent, setLoading } from '../Redux/Slices/userSlice';
import { apiConnector } from '../Services/apiConnector';
import { agentEndpoints } from '../Services/apis';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";
function EditAgent({agentId,closeModal}) {

    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.user.loading)
    const allAgent = useSelector((state)=>state.user.allAgent)
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode :"+91"
  });

  useEffect(()=>{
    const findAgent = allAgent?.find((agent)=>agent?._id === agentId)
    setFormData({
      name: findAgent.name || "",
      email: findAgent.email || "",
      phone: findAgent.phone || "",
      countryCode: findAgent.countryCode || "+91",
    });
  },[allAgent])

  const handleChange = (e) => {
    if(e.target.name === "phone"){
        e.target.value = e.target.value?.slice(0,10)
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
    const handleSubmit = async (e)=>{
        try{
            e.preventDefault();
            formData.agentId = agentId
            dispatch(setLoading(true))
            const result = await apiConnector("PUT",agentEndpoints.UPDATE_AGENT,formData)
            toast.success(result?.data?.message || "Agent Updated Successfully")
            dispatch(clearAllAgent())
            dispatch(setLoading(false))
            closeModal()
            
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message || "Error in Updating the Agent")
            console.log("Error in editing the Agent : ",error);
        }
    }

  return (
    <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center bg-black/30'>
      <div className='lg:w-[30vw] w-[95vw] lg:h-[50vh] h-[42vh] bg-white p-8  rounded-lg'>
        <div className='flex justify-between items-center  mb-6'>
            <h1 className='text-center text-2xl font-semibold text-indigo-700'>Edit Agent</h1> 
            <p onClick={closeModal} className='cursor-pointer text-3xl'><IoMdClose/></p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
            <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="flex gap-2">
            <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+81">🇯🇵 +81</option>
                {/* Add more as needed */}
            </select>
            <input
                type="number"
                name="phone"
                placeholder="Mobile Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="flex-1  p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            </div>

            <button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
            🚀 Update Agent
            </button>
        </form>
      </div>
    </div>
  )
}

export default EditAgent
