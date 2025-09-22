import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/asioxSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

const ManageBookingApproval = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: bookings = [], isLoading, error } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/bookings/${id}`, { status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('bookings');
            queryClient.invalidateQueries('members');
            toast.success('Booking status updated successfully');
        },
        onError: () => {
            toast.error('Failed to update booking status');
        }
    });

    const handleApprove = (id) => {
        Swal.fire({
            title: 'Approve Booking',
            text: 'Are you sure you want to approve this booking?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10B981',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, Approve',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate({ id, status: 'approved' });
                Swal.fire({
                    title: 'Approved!',
                    text: 'Booking has been approved successfully.',
                    icon: 'success',
                    confirmButtonColor: '#10B981'
                });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: 'Reject Booking',
            text: 'Are you sure you want to reject this booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, Reject',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate({ id, status: 'rejected' });
                Swal.fire({
                    title: 'Rejected!',
                    text: 'Booking has been rejected.',
                    icon: 'error',
                    confirmButtonColor: '#EF4444'
                });
            }
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertCircle, text: 'Pending' },
            approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, text: 'Approved' },
            rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, text: 'Rejected' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
                <IconComponent className="w-4 h-4 mr-1" />
                {config.text}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading bookings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Error loading bookings</p>
                </div>
            </div>
        );
    }

    // Filter bookings by status for statistics
    const pendingBookings = bookings.filter(booking => booking.status === 'pending');
    const approvedBookings = bookings.filter(booking => booking.status === 'approved');
   

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Manage Booking Approvals</h1>
                                <p className="text-gray-600 mt-1">Review and manage court booking requests</p>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-100 text-sm">Total Bookings</p>
                                        <p className="text-2xl font-bold">{bookings.length}</p>
                                    </div>
                                    <Eye className="w-8 h-8 text-blue-200" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-yellow-100 text-sm">Pending</p>
                                        <p className="text-2xl font-bold">{pendingBookings.length}</p>
                                    </div>
                                    <AlertCircle className="w-8 h-8 text-yellow-200" />
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-100 text-sm">Approved</p>
                                        <p className="text-2xl font-bold">{approvedBookings.length}</p>
                                    </div>
                                    <CheckCircle className="w-8 h-8 text-green-200" />
                                </div>
                            </div>
                            {/* <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-red-100 text-sm">Rejected</p>
                                        <p className="text-2xl font-bold">{rejectedBookings.length}</p>
                                    </div>
                                    <XCircle className="w-8 h-8 text-red-200" />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Bookings Table/Cards */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {bookings.length === 0 ? (
                        <div className="text-center py-16">
                            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Found</h3>
                            <p className="text-gray-600">No booking requests available at the moment.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {/* Desktop Table View */}
                            <div className="hidden lg:block">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Court</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Time</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Status</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                            <User className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <span className="font-medium text-gray-900">{booking.userEmail}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-900">{booking.courtName}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-900">{new Date(booking.date).toLocaleDateString()}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-900">{booking.time}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    {getStatusBadge(booking.status)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        {booking.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(booking._id)}
                                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                                                >
                                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(booking._id)}
                                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                                                                >
                                                                    <XCircle className="w-4 h-4 mr-1" />
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden p-4 space-y-4">
                                {bookings.map((booking) => (
                                    <div key={booking._id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                                    <User className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">{booking.userEmail}</h3>
                                                    <p className="text-gray-600 flex items-center mt-1">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        {booking.courtName}
                                                    </p>
                                                </div>
                                            </div>
                                            {getStatusBadge(booking.status)}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-700">{new Date(booking.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                <span className="text-sm text-gray-700">{booking.time}</span>
                                            </div>
                                        </div>

                                        {booking.status === 'pending' && (
                                            <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={() => handleApprove(booking._id)}
                                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(booking._id)}
                                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                                                >
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBookingApproval;