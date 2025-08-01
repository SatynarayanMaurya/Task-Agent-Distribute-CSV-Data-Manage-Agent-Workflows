import React, { useState } from "react";
import { motion } from "framer-motion";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { setLoading, setUserDetails } from "../Redux/Slices/userSlice";
import { apiConnector } from "../Services/apiConnector";
import { authEndpoints } from "../Services/apis";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loading = useSelector((state)=>state.user.loading)

    const handleSubmit =async (e) =>{
        try{
            e.preventDefault()
            if(!email){
                toast.error("Email is required !");
                return ;
            }
            if(!password){
                toast.error("Password is required !");
                return ;
            }
            dispatch(setLoading(true))
            const result = await apiConnector("POST",authEndpoints.LOGIN_API,{email,password})
            dispatch(setUserDetails(result?.data?.user))
            toast.success(result?.data?.message || "Login successful")
            dispatch(setLoading(false))
            localStorage.setItem("token",result?.data?.token)
            navigate("/")
            
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message||"Error in login ")
            console.log("Error while login : ",error)
        }
    }
    const [eyeOpen ,setEyeOpen] = useState(false)
  return (
    <div className="w-11/12 mx-auto min-h-screen flex flex-col justify-center md:flex-row">
        {loading && <Spinner/>}
      {/* Left - Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center h-64 md:h-auto ">
        <img
          src={"https://testsigma.com/blog/wp-content/uploads/37c08d79-0e87-45ce-b1ed-c9bde83c16e7.png"}
          alt="Login Visual"
          className="w-[90%] h-fit object-cover"
        />
      </div>

      {/* Right - Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center  pr-6 py-12 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8"
        >
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type={eyeOpen?"text":"password"}
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
              />
              <p onClick={()=>setEyeOpen(!eyeOpen)} className="absolute right-4 top-10 text-xl cursor-pointer">{!eyeOpen?<VscEye/>:<VscEyeClosed/>}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl shadow hover:bg-indigo-700 transition-all"
              type="submit"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            &copy; {new Date().getFullYear()} MERN Dashboard. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
