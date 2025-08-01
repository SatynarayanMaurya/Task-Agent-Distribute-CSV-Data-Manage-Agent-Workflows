
import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const pageTitles = {
    "/": "Dashboard",
    "/add-agent": "Add Agent",
    "/upload-csv": "Upload CSV",
  };
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || "Dashboard";



  // Auto-close on click outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle tab click from sidebar
  const handleTabClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-100 border-r border-gray-300 p-4
          z-30 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-[15%]
        `}
      >
        <LeftSidebar onTabClick={handleTabClick} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-[85%]">
        {/* Top bar (visible only on mobile) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="text-2xl">
            <FiMenu />
          </button>
          <h1 className="text-lg font-semibold">{currentTitle}</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;