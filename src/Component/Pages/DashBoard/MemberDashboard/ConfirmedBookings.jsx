import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hook/asioxSecure';
import { FaClock, FaCoins, FaCalendarAlt, FaSearch, FaCheckCircle, FaShieldAlt, FaDownload } from 'react-icons/fa';

const ConfirmedBookings = () => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  const fetchConfirmedBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get('/confirmed-bookings');
      setConfirmedBookings(data);
    } catch (error) {
      console.error('Error fetching confirmed bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = confirmedBookings.filter(booking =>
    booking.courtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    return new Date(dateTime).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'paid':
        return 'bg-emerald-100 text-emerald-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const handleDownloadReceipt = (bookingId) => {
    // Placeholder for download functionality
    console.log('Downloading receipt for booking:', bookingId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Confirmed Bookings</h1>
                <p className="text-slate-600">View your paid and confirmed court reservations</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by court type or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <FaShieldAlt className="text-emerald-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Confirmed</p>
                <p className="text-2xl font-bold text-slate-800">{filteredBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaCoins className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Spent</p>
                <p className="text-2xl font-bold text-slate-800">
                  ${filteredBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaCalendarAlt className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-slate-500">This Month</p>
                <p className="text-2xl font-bold text-slate-800">
                  {filteredBookings.filter(booking => {
                    const bookingDate = new Date(booking.time);
                    const now = new Date();
                    return bookingDate.getMonth() === now.getMonth() && 
                           bookingDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Cards */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="text-slate-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Confirmed Bookings</h3>
            <p className="text-slate-600">You don't have any confirmed bookings at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                    
                    {/* Court Type */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <FaCalendarAlt className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Court Type</p>
                        <p className="font-medium text-slate-800">{booking.courtType}</p>
                      </div>
                    </div>

                    {/* Slot Time */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <FaClock className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Scheduled Time</p>
                        <p className="font-medium text-slate-800">{formatDateTime(booking.time)}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <FaCoins className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Total Paid</p>
                        <p className="font-semibold text-slate-800">${booking.totalPrice}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <FaCheckCircle className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status || 'Confirmed'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDownloadReceipt(booking._id)}
                        className="group bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
                      >
                        <FaDownload className="group-hover:scale-110 transition-transform duration-200" />
                        <span>Receipt</span>
                      </button>
                    </div>

                  </div>
                </div>
                
                {/* Status Bar - Blue/Green for confirmed */}
                <div className="h-1 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmedBookings;