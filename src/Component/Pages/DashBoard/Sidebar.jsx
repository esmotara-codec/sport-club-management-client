import {  Bell, Calendar, ChevronRight, CreditCard, Crown, LayoutDashboard, Package, Target, Trophy, User, User2, UserRound, Users } from "lucide-react";
import { Link } from "react-router-dom";
import useRole from "../../hook/useRole";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../shared/Loading/Loading";

const adminSidebarItems = [
  { name: "Insights", path: "/dashboard/admin", icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { name: "Manage Bookings", path: "/dashboard/manage-bookings", icon: <Calendar className="size-5" />, category: "Management" },
  { name: "All Users", path: "/dashboard/manage-users", icon: <Users className="size-5" />, category: "Management" },
  { name: "Manage Members", path: "/dashboard/manage-members", icon: <Crown className="size-5" />, category: "Management" },
  { name: "Manage Courts", path: "/dashboard/manage-courts", icon: <Target className="size-5" />, category: "Management" },
  { name: "Manage Coupons", path: "/dashboard/manage-coupons", icon: <Package className="size-5" />, category: "Management" },
  { name: "Make Announcement", path: "/dashboard/make-announcement", icon: <Bell className="size-5" />, category: "Communication" },
  { name: "Profile", path: "/dashboard/profile", icon: <User2 className="size-5" />, category: "Account" },
];

const memberSidebarItems = [
  { name: "Insights", path: "/dashboard/member", icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { name: "My Bookings", path: "/dashboard/my-bookings", icon: <Calendar className="size-5" />, category: "Bookings" },
  { name: "Pending Bookings", path: "/dashboard/pending-bookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Approved Bookings", path: "/dashboard/approved-bookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Confirmed Bookings", path: "/dashboard/confirmed-bookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Payment History", path: "/dashboard/payment-history", icon: <CreditCard className="size-5" />, category: "Finance" },
  { name: "Announcements", path: "/dashboard/announcements", icon: <Bell className="size-5" />, category: "Communication" },
  { name: "Profile", path: "/dashboard/profile", icon: <User2 className="size-5" />, category: "Account" },
];

const userSidebarItems = [
  { name: "Insights", path: "/dashboard/user", icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { name: "My Bookings", path: "/dashboard/my-bookings", icon: <Calendar className="size-5" />, category: "Bookings" },
  { name: "Pending Bookings", path: "/dashboard/pending-bookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Announcements", path: "/dashboard/announcements", icon: <Bell className="size-5" />, category: "Communication" },
  { name: "Become a Member", path: "/dashboard/become-member", icon: <UserRound className="size-5" />, category: "Upgrade" },
  { name: "Profile", path: "/dashboard/profile", icon: <User2 className="size-5" />, category: "Account" },
];

// Main Sidebar Component
const Sidebar = () => {
  const { role, loading: roleLoading } = useRole();
  const { loading: authLoading } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState('/dashboard/admin');
  const [currentView, setCurrentView] = useState('insights');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (roleLoading || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  let SidebarItems;
  if (role === 'admin') {
    SidebarItems = adminSidebarItems;
  } else if (role === 'member') {
    SidebarItems = memberSidebarItems;
  } else {
    SidebarItems = userSidebarItems;
  }

  // Group items by category
  const groupedItems = SidebarItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleNavClick = (path, itemName) => {
    setActiveItem(path);
    if (itemName === 'Insights') {
      setCurrentView('insights');
    } else {
      setCurrentView('other');
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-80'} transition-all duration-300 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl`}>
        {/* Logo */}
        <div className="flex items-center justify-center py-8 border-b border-slate-700">
          {!sidebarCollapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Sport<span className="text-blue-400">Club</span>
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{role} Portal</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Trophy className="size-6 text-white" />
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="px-4 py-6 overflow-y-auto h-full">
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                {!sidebarCollapsed && (
                  <h3 className="text-xs uppercase text-slate-400 font-semibold mb-3 px-3">
                    {category}
                  </h3>
                )}
                <div className="space-y-1">
                  {items.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path, item.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} group ${
                        activeItem === item.path
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <div className={`${activeItem === item.path ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-400'}`}>
                        {item.icon}
                      </div>
                      {!sidebarCollapsed && (
                        <>
                          <span className="font-medium">{item.name}</span>
                          {activeItem === item.path && (
                            <ChevronRight className="size-4 ml-auto text-blue-200" />
                          )}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        {/* <TopNavigation role={role} onSidebarToggle={toggleSidebar} /> */}

        {/* Page Content */}
        {/* <main className="flex-1 overflow-y-auto">
          {currentView === 'insights' ? (
            <InsightsDashboard role={role} />
          ) : (
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {SidebarItems.find(item => item.path === activeItem)?.name || 'Dashboard'}
              </h1>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-gray-600">Content for the selected menu item will be displayed here.</p>
              </div>
            </div>
          )}
        </main> */}
      </div>
    </div>
  );
};

export default Sidebar;