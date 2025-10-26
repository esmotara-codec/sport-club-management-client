import { useState } from 'react';
import { Outlet } from "react-router";
import Sidebar from "../../Pages/DashBoard/Sidebar";
import DasboardTopNav from "./DasboardTopNav";
import useRole from "../../hook/useRole";
import { X } from "lucide-react";

const DashboardLayout = () => {
  const { role } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-80 bg-blue-900 shadow-md z-10">
        <Sidebar />
      </aside>

      {/* Sidebar - Mobile (Drawer) */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Slide-out Drawer */}
          <div
            className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-blue-900 shadow-2xl transform transition-transform duration-300 ease-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-full text-white hover:bg-blue-800"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>
            
            <Sidebar />
          </div>
        </div>
      )}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white shadow-sm">
          <DasboardTopNav role={role} onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        
        {/* Main Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;