import React, { useState } from "react";
import { motion } from "framer-motion";
import {useNavigate} from 'react-router-dom'
import { apiConnector } from "../Services/apiConnector";
import { agentEndpoints } from "../Services/apis";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearAllAgent, setLoading } from "../Redux/Slices/userSlice";
import Spinner from "../Components/Spinner"
const AddAgent = () => {

    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.user.loading)
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    countryCode :"+91"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { ...formData };

        try {
            dispatch(setLoading(true))
            const result = await apiConnector("POST", agentEndpoints.ADD_AGENT, payload);
            toast.success(result?.data?.message || "Agent created successfully");
            dispatch(setLoading(false))
            dispatch(clearAllAgent())
            navigate("/")
        } catch (error) {
            dispatch(setLoading(false))
            console.error("Error in creating the agent : ",error);
            toast.error(error?.response?.data?.message||"Failed to create agent");
        }
    };

  return (
    <motion.div
      className="lg:w-[60%] mx-auto p-8 mt-12 bg-white rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
        {loading && <Spinner/>}
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        ✨ Add New Agent
      </h2>

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
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          🚀 Create Agent
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddAgent;
