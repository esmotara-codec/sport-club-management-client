import { Calendar, Crown, Target, Users } from "lucide-react";
import InsightCard from "./InsightCard";

const Insight = ({ role }) => {

  // Mock insights data
  const mockInsightsData = {
    totalCourts: 12,
    totalUsers: 1247,
    totalMembers: 189,
    activeBookings: 45,
    revenue: 25670
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {/* {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard */}
         Hey there!
        </h1>
        <p className="text-gray-600"> Here's what's happening with your sport club.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InsightCard
          title="Total Courts"
          value={mockInsightsData.totalCourts}
          icon={<Target className="size-8" />}
          color="blue"
        />
        <InsightCard
          title="Total Users"
          value={mockInsightsData.totalUsers}
          icon={<Users className="size-8" />}
          color="green"
        />
        <InsightCard
          title="Total Members"
          value={mockInsightsData.totalMembers}
          icon={<Crown className="size-8" />}
          color="purple"
        />
        <InsightCard
          title="Active Bookings"
          value={mockInsightsData.activeBookings}
          icon={<Calendar className="size-8" />}
          color="orange"
        />
      </div>

      {role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Court Utilization</span>
                <span className="font-semibold text-blue-600">78%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Member Growth</span>
                <span className="font-semibold text-green-600">+15%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Monthly Revenue</span>
                <span className="font-semibold text-purple-600">${mockInsightsData.revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New member registration</span>
                <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Court booking confirmed</span>
                <span className="text-xs text-gray-400 ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Payment received</span>
                <span className="text-xs text-gray-400 ml-auto">10 min ago</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insight ;