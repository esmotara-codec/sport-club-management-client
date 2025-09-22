
import { Outlet } from "react-router";
import Sidebar from "../../Pages/DashBoard/Sidebar";
import DasboardTopNav from "./DasboardTopNav";
import useRole from "../../hook/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
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
         <DasboardTopNav role={role}/>
        </header>
        
        {/* Main Content */}
      
          <Outlet/>
       
      </div>
    </div>
  );
};

export default DashboardLayout;