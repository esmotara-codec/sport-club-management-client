
import { Outlet } from "react-router";
import Sidebar from "../../Pages/DashBoard/Sidebar";
import DasboardTopNav from "./DasboardTopNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-80 bg-blue-900 shadow-md z-10">
        <Sidebar />
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white shadow-sm ">
         <DasboardTopNav/>
        </header>
        
        {/* Main Content */}
      
          <Outlet/>
       
      </div>
    </div>
  );
};

export default DashboardLayout;