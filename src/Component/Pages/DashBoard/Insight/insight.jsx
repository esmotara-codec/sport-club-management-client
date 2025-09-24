import React from 'react';
import { Calendar, Crown, Target, Users } from "lucide-react";
import InsightCard from "./InsightCard";
import useCourts from '../../../hook/useCourts';
import useAxiosSecure from '../../../hook/asioxSecure';
import { useQuery } from '@tanstack/react-query';

const Insight = ({ role }) => {
  const [courts] = useCourts();
  const axiosSecure = useAxiosSecure();

  // Fetch users data
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  // Fetch members data
  const { data: members = [], isLoading: membersLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/members');
      return res.data;
    }
  });

  // Fetch bookings data (you might need to adjust the endpoint)
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings'); // Adjust endpoint as needed
      return res.data;
    }
  });

  // Calculate active bookings (assuming bookings have a status field)
  const activeBookings = bookings.filter(booking => 
    booking.status === 'active' || booking.status === 'confirmed'
  ).length;

  // Mock revenue calculation - you can replace with actual revenue API call
  const mockRevenue = 25670;

  // Loading state
  if (usersLoading || membersLoading || bookingsLoading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hey there!
        </h1>
        <p className="text-gray-600"> Here's what's happening with your sport club.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InsightCard
          title="Total Courts"
          value={courts.length}
          icon={<Target className="size-8" />}
          color="blue"
        />
        <InsightCard
          title="Total Users"
          value={users.length}
          icon={<Users className="size-8" />}
          color="green"
        />
        <InsightCard
          title="Total Members"
          value={members.length}
          icon={<Crown className="size-8" />}
          color="purple"
        />
        <InsightCard
          title="Active Bookings"
          value={activeBookings}
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
                <span className="font-semibold text-blue-600">
                  {courts.length > 0 ? Math.round((activeBookings / courts.length) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Registrations</span>
                <span className="font-semibold text-green-600">{users.length + members.length}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Monthly Revenue</span>
                <span className="font-semibold text-purple-600">${mockRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">System Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Courts Available</span>
                <span className="text-xs text-gray-500 ml-auto font-medium">{courts.length} courts</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-xs text-gray-500 ml-auto font-medium">{users.length} users</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Premium Members</span>
                <span className="text-xs text-gray-500 ml-auto font-medium">{members.length} members</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Current Bookings</span>
                <span className="text-xs text-gray-500 ml-auto font-medium">{activeBookings} active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insight;