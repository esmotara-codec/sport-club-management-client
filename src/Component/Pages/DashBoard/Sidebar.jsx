import {  Bell, Calendar, ChevronRight, CreditCard, Crown, LayoutDashboard, Package, Target, Trophy, User, User2, UserRound, Users } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useRole from "../../hook/useRole";

// Import your separate components


import DasboardTopNav from "../../layout/DashboardLayout/DasboardTopNav";

const adminSidebarItems = [
  { name: "Insights", component: "Insights", icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { name: "Manage Bookings", component: "ManageBookings", icon: <Calendar className="size-5" />, category: "Management" },
  { name: "All Users", component: "AllUsers", icon: <Users className="size-5" />, category: "Management" },
  { name: "Manage Members", component: "ManageMembers", icon: <Crown className="size-5" />, category: "Management" },
  { name: "Manage Courts", component: "ManageCourts", icon: <Target className="size-5" />, category: "Management" },
  { name: "Manage Coupons", component: "ManageCoupons", icon: <Package className="size-5" />, category: "Management" },
  { name: "Make Announcement", component: "MakeAnnouncement", icon: <Bell className="size-5" />, category: "Communication" },
  { name: "Profile", component: "Profile", icon: <User2 className="size-5" />, category: "Account" },
];

const memberSidebarItems = [
  { name: "Insights", component: "Insights", icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { name: "My Bookings", component: "MyBookings", icon: <Calendar className="size-5" />, category: "Bookings" },
  { name: "Pending Bookings", component: "PendingBookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Approved Bookings", component: "ApprovedBookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Confirmed Bookings", component: "ConfirmedBookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Payment History", component: "PaymentHistory", icon: <CreditCard className="size-5" />, category: "Finance" },
  { name: "Announcements", component: "Announcements", icon: <Bell className="size-5" />, category: "Communication" },
  { name: "Profile", component: "Profile", icon: <User2 className="size-5" />, category: "Account" },
];

const userSidebarItems = [
  { name: "Insights", component: "Insights", icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { name: "My Bookings", component: "MyBookings", icon: <Calendar className="size-5" />, category: "Bookings" },
  { name: "Pending Bookings", component: "PendingBookings", icon: <Package className="size-5" />, category: "Bookings" },
  { name: "Announcements", component: "Announcements", icon: <Bell className="size-5" />, category: "Communication" },
  { name: "Become a Member", component: "BecomeMember", icon: <UserRound className="size-5" />, category: "Upgrade" },
  { name: "Profile", component: "Profile", icon: <User2 className="size-5" />, category: "Account" },
];

// Component mapping - maps component names to actual components
const ComponentMap = {
  Insights: Insight,
  ManageBookings: ManageBookings,
  AllUsers: AllUsers,
  ManageMembers: ManageMembers,
  ManageCourts: ManageCourts,
  ManageCoupons: ManageCoupons,
  MakeAnnouncement: MakeAnnouncement,
  MyBookings: MyBookings,
  PendingBookings: PendingBookings,
  ApprovedBookings: ApprovedBookings,
  ConfirmedBookings: ConfirmedBookings,
  PaymentHistory: PaymentHistory,
  Announcements: Announcements,
  BecomeMember: BecomeMember,
  Profile: Profile,
};



// Main Sidebar Component
const Sidebar = () => {
  const { role, loading: roleLoading } = useRole();
  const { loading: authLoading } = useContext(AuthContext);
  const [activeComponent, setActiveComponent] = useState('Insights');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (roleLoading || authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-blue-600"></div>
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

  const handleNavClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Get the active component to render
  const ActiveComponent = ComponentMap[activeComponent];

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
                      key={item.component}
                      onClick={() => handleNavClick(item.component)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} group ${
                        activeComponent === item.component
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                          : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <div className={`${activeComponent === item.component ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-400'}`}>
                        {item.icon}
                      </div>
                      {!sidebarCollapsed && (
                        <>
                          <span className="font-medium">{item.name}</span>
                          {activeComponent === item.component && (
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
        <DasboardTopNav role={role} onSidebarToggle={toggleSidebar} />

        {/* Page Content - Renders the selected component */}
        <main className="flex-1 overflow-y-auto">
          {ActiveComponent && <ActiveComponent role={role} />}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;