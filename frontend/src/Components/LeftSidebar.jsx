
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiUpload2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { authEndpoints } from '../Services/apis';
import { apiConnector } from '../Services/apiConnector';
import { setLoading, setUserDetails } from '../Redux/Slices/userSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const tabs = [
  { label: 'Dashboard', path: '/', icon: <FaHome /> },
  { label: 'Add Agent', path: '/add-agent', icon: <CgProfile /> },
  { label: 'Upload CSV', path: '/upload-csv', icon: <RiUpload2Line /> },
];

function LeftSidebar({ onTabClick }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const userDetails = useSelector((state) => state.user.userDetails);

  const getUserDetails = async () => {
    try {
      if (userDetails) return;
      dispatch(setLoading(true));
      const result = await apiConnector("GET", authEndpoints.GET_USER_DETAILS);
      dispatch(setUserDetails(result?.data?.userDetails));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error?.response?.data?.message);
      console.log("Error in getting userDetails: ", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {loading && <Spinner />}
      <h2 className="text-xl font-semibold mb-4 whitespace-nowrap overflow-x-scroll hide-scrollbar">
        {userDetails?.email || "Admin"}
      </h2>

      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end
          onClick={() => {
            if (onTabClick) onTabClick(); // <-- Close sidebar on mobile
          }}
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-lg font-medium flex gap-4 items-center ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-800 hover:bg-gray-200'
            }`
          }
        >
          {tab.icon}
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default LeftSidebar;