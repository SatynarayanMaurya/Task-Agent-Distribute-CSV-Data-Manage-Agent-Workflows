import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { apiConnector } from '../Services/apiConnector';
import { taskEndpoints } from '../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { clearAllAgent, clearAllTask, setLoading } from '../Redux/Slices/userSlice';
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const UploadCsv = () => {

  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.user.loading)
  const navigate = useNavigate()

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const handleFile = (uploadedFile) => {
    const validTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (uploadedFile && validTypes.includes(uploadedFile.type)) {
      setFile(uploadedFile);
      setError('');
    } else {
      setError('Only .csv, .xlsx, and .xls files are allowed.');
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    try {
      dispatch(setLoading(true))
      const result = await apiConnector("POST",taskEndpoints.UPLOAD_CSV,{file},{'Content-Type': 'multipart/form-data'})
      toast.success(result?.data?.message || "File Uploaded successfully !")
      dispatch(clearAllAgent())
      dispatch(clearAllTask())
      dispatch(setLoading(false))
      navigate("/")
      
    } catch (err) {
      dispatch(setLoading(false))
      console.error('Upload Error:', err);
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <motion.div
      className="w-full h-[80vh] flex flex-col justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {loading && <Spinner/>}
      <div className="bg-white shadow-xl rounded-xl p-8 w-full h-fit">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center tracking-wide">Upload List</h2>

        <div
          className="border-2 border-dashed border-gray-400 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 p-10 text-center cursor-pointer"
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-gray-700 font-semibold text-lg">Drag & Drop your file here</p>
          <p className="text-sm text-gray-500 mt-1">or click to browse (.csv, .xlsx, .xls)</p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv, .xlsx, .xls"
          onChange={handleChange}
        />

        {file && (
          <div className="mt-5 text-sm text-green-600 font-medium">
            ✅ Selected File: <span className="font-semibold">{file.name}</span>
          </div>
        )}

        {error && (
          <div className="mt-5 text-sm text-red-600 font-medium">{error}</div>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          onClick={handleUpload}
        >
          Upload File
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UploadCsv;
