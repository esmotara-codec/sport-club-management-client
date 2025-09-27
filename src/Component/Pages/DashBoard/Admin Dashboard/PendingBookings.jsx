import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hook/asioxSecure';
import Swal from 'sweetalert2';
import { FaUser, FaClock, FaCoins, FaCalendarAlt, FaTimes, FaSearch } from 'react-icons/fa';

const PendingBookings = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get('/pending-bookings');
      console.log("Boking data", data);
      setPendingBookings(data);
    } catch (error) {
      console.error('Error fetching pending bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to cancel this booking.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#64748b',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, cancel it!',
        buttonsStyling: true,
        customClass: {
          popup: 'rounded-lg',
          confirmButton: 'rounded-lg px-4 py-2',
          cancelButton: 'rounded-lg px-4 py-2'
        }
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/bookings/${bookingId}`);
        fetchPendingBookings();
        Swal.fire({
          title: 'Cancelled!',
          text: 'The booking has been cancelled.',
          icon: 'success',
          customClass: {
            popup: 'rounded-lg'
          }
        });
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to cancel the booking.',
        icon: 'error',
        customClass: {
          popup: 'rounded-lg'
        }
      });
    }
  };

  const filteredBookings = pendingBookings.filter(booking =>
    booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.courtType.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Pending Bookings</h1>
                <p className="text-slate-600">Manage and review pending court reservations</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative max-w-md w-full">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by email or court type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <FaCalendarAlt className="text-slate-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Pending</p>
                  <p className="text-2xl font-bold text-slate-800">{filteredBookings.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Cards */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="text-slate-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Pending Bookings</h3>
            <p className="text-slate-600">There are currently no pending bookings to display.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-40 items-center">
                    
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <FaUser className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Name</p>
                        <p className="font-medium text-slate-800 truncate">{booking.userEmail}</p>
                      </div>
                    </div>

                    {/* Court Type */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <FaCalendarAlt className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Court Type</p>
                        <p className="font-medium text-slate-800">{booking.courtName}</p>
                      </div>
                    </div>

                    {/* Slot Time */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <FaClock className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Time Slot</p>
                        <p className="font-medium text-slate-800">{formatDateTime(booking.time)}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 p-2 rounded-lg">
                        <FaCoins className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Price</p>
                        <p className="font-semibold text-slate-800">${booking.totalPrice}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="group bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
                      >
                        <FaTimes className="group-hover:scale-110 transition-transform duration-200" />
                        <span>Cancel</span>
                      </button>
                    </div>

                  </div>
                </div>
                
              
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingBookings;