import { Bell, Calendar, ChevronRight, CreditCard, Crown, LayoutDashboard, Target, Trophy, User2, UserRound, Users } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useRole from "../../hook/useRole";
import { Link, useNavigate } from "react-router-dom";

const adminSidebarItems = [
  { id: 'insights', name: "Insights", path: '/dashboard/admin', icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { id: 'manage-bookings', name: "Manage Bookings", path: '/dashboard/manage-bookings', icon: <Calendar className="size-5" />, category: "Management" },
  { id: 'all-users', name: "All Users", path: '/dashboard/all-users', icon: <Users className="size-5" />, category: "Management" },
  { id: 'manage-members', name: "Manage Members", path: '/dashboard/manage-members', icon: <Crown className="size-5" />, category: "Management" },
  { id: 'manage-courts', name: "Manage Courts", path: '/dashboard/manage-courts', icon: <Target className="size-5" />, category: "Management" },
  { id: 'manage-coupons', name: "Manage Coupons", path: '/dashboard/manage-coupons', icon: <Crown className="size-5" />, category: "Management" },
  { id: 'make-announcement', name: "Make Announcement", path: '/dashboard/make-announcement', icon: <Bell className="size-5" />, category: "Communication" },
  { id: 'profile', name: "Profile", path: '/dashboard/adminprofile', icon: <User2 className="size-5" />, category: "Account" },
];

const memberSidebarItems = [
  { id: 'insights', name: "Insights", path: '/dashboard/member', icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { id: 'my-bookings', name: "My Bookings", path: '/dashboard/my-bookings', icon: <Calendar className="size-5" />, category: "Bookings" },
  { id: 'pending-bookings', name: "Pending Bookings", path: '/dashboard/pending-bookings', icon: <Crown className="size-5" />, category: "Bookings" },
  { id: 'approved-bookings', name: "Approved Bookings", path: '/dashboard/approved-bookings', icon: <Crown className="size-5" />, category: "Bookings" },
  { id: 'confirmed-bookings', name: "Confirmed Bookings", path: '/dashboard/confirmed-bookings', icon: <Crown className="size-5" />, category: "Bookings" },
  { id: 'payment-history', name: "Payment History", path: '/dashboard/payment-history', icon: <CreditCard className="size-5" />, category: "Finance" },
  { id: 'announcements', name: "Announcements", path: '/dashboard/announcements', icon: <Bell className="size-5" />, category: "Communication" },
  { id: 'profile', name: "Profile", path: '/dashboard/profile', icon: <User2 className="size-5" />, category: "Account" },
];

const userSidebarItems = [
  { id: 'insights', name: "Insights", path: '/dashboard/user', icon: <LayoutDashboard className="size-5" />, category: "Overview" },
  { id: 'my-bookings', name: "My Bookings", path: '/dashboard/my-bookings', icon: <Calendar className="size-5" />, category: "Bookings" },
  { id: 'pending-bookings', name: "Pending Bookings", path: '/dashboard/pending-bookings', icon: <Crown className="size-5" />, category: "Bookings" },
  { id: 'announcements', name: "Announcements", path: '/dashboard/announcements', icon: <Bell className="size-5" />, category: "Communication" },
  { id: 'become-member', name: "Become a Member", path: '/dashboard/become-member', icon: <UserRound className="size-5" />, category: "Upgrade" },
  { id: 'profile', name: "Profile", path: '/dashboard/profile', icon: <User2 className="size-5" />, category: "Account" },
];

// Just the Sidebar Component (no main content)
const Sidebar = () => {
  const { role, loading: roleLoading } = useRole();
  const { loading: authLoading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('insights');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  if (roleLoading || authLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
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

  const handleTabClick = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };



  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-full'} h-full transition-all duration-300 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex flex-col`}>
      {/* Logo */}
      <div className="flex items-center justify-center py-8 border-b border-slate-700">
        {!sidebarCollapsed ? (
         
           <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Trophy className="size-6 text-white" />
            </div>
          
            <div>
              <h1 className="text-2xl font-bold text-white">
                Sport<span className="text-blue-400">Club</span>
              </h1>
              <p className="text-xs text-slate-400 uppercase tracking-wider">{role} Portal</p>
            </div>
             </Link>
          
        ) : (
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Trophy className="size-6 text-white" />
          </div>
        )}
      </div>

    
      {/* Navigation Sections */}
      <div className="px-4 pb-6 overflow-y-auto flex-1">
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              {!sidebarCollapsed && (
                <h3 className="text-xs uppercase text-slate-400 font-semibold mb-3 px-3 pt-5">
                  {category}
                </h3>
              )}
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} group ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <div className={`${activeTab === item.id ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-400'}`}>
                      {item.icon}
                    </div>
                    {!sidebarCollapsed && (
                      <>
                        <span className="font-medium">{item.name}</span>
                        {activeTab === item.id && (
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
    </div>
  );
};

export default Sidebar;