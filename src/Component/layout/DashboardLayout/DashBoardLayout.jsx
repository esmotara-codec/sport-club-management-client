
import { Outlet } from "react-router";
import Sidebar from "../../Pages/DashBoard/Sidebar";

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
        <header className="sticky top-0 z-20 bg-white shadow-sm mb-10">
          {/* <DashBoardTopNav /> */}
        </header>
        
        {/* Main Content */}
        <main className="flex-1 py-6 bg-gray-100">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;