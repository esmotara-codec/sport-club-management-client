import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/asioxSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Ticket, Plus, Edit3, Trash2, Percent, Tag, FileText, X } from 'lucide-react';

const ManageCoupons = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [couponId, setCouponId] = useState(null);

    const { data: coupons = [], isLoading, error } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/coupons');
            return res.data;
        }
    });

    const addMutation = useMutation({
        mutationFn: async (newCoupon) => {
            const res = await axiosSecure.post('/coupons', newCoupon);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('coupons');
            toast.success('Coupon added successfully');
            setCouponCode('');
            setDiscount('');
            setDescription('');
        },
        onError: () => {
            toast.error('Failed to add coupon');
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedCoupon) => {
            const res = await axiosSecure.put(`/coupons/${couponId}`, updatedCoupon);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('coupons');
            toast.success('Coupon updated successfully');
            setCouponCode('');
            setDiscount('');
            setDescription('');
            setIsUpdating(false);
            setCouponId(null);
        },
        onError: () => {
            toast.error('Failed to update coupon');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/coupons/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('coupons');
            toast.success('Coupon deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete coupon');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isUpdating) {
            updateMutation.mutate({ couponCode, discount, description });
        } else {
            addMutation.mutate({ couponCode, discount, description });
        }
    };

    const handleEdit = (coupon) => {
        setIsUpdating(true);
        setCouponId(coupon._id);
        setCouponCode(coupon.couponCode);
        setDiscount(coupon.discount);
        setDescription(coupon.description);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Coupon',
            text: "Are you sure you want to delete this coupon? This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Coupon has been deleted successfully.',
                    icon: 'success',
                    confirmButtonColor: '#10B981'
                });
            }
        });
    };

    const handleCancel = () => {
        setIsUpdating(false);
        setCouponId(null);
        setCouponCode('');
        setDiscount('');
        setDescription('');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading coupons...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Ticket className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Error loading coupons</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-8xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                                <Ticket className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Manage Coupons</h1>
                                <p className="text-gray-600 mt-1">Create and manage discount coupons</p>
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4 text-blue-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-600 text-sm">Total Coupons</p>
                                        <p className="text-2xl font-bold">{coupons.length}</p>
                                    </div>
                                    <Ticket className="w-8 h-8 text-blue-700" />
                                </div>
                            </div>
                            {/* <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4 text-blue-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-700 text-sm">Active Coupons</p>
                                        <p className="text-2xl font-bold">{coupons.length}</p>
                                    </div>
                                    <Tag className="w-8 h-8 text-blue-700" />
                                </div>
                            </div> */}
                            
                        </div>
                    </div>
                </div>

                {/* Add/Edit Coupon Form */}
                <div className="mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                {isUpdating ? <Edit3 className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                                {isUpdating ? 'Update Coupon' : 'Create New Coupon'}
                            </h2>
                            {isUpdating && (
                                <button
                                    onClick={handleCancel}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Tag className="w-4 h-4 inline mr-1" />
                                        Coupon Code
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., SAVE20"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Percent className="w-4 h-4 inline mr-1" />
                                        Discount Percentage
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 20"
                                        min="1"
                                        max="100"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FileText className="w-4 h-4 inline mr-1" />
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Summer Sale"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center"
                                >
                                    {isUpdating ? <Edit3 className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                    {isUpdating ? 'Update Coupon' : 'Create Coupon'}
                                </button>
                                {isUpdating && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Coupons List */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {coupons.length === 0 ? (
                        <div className="text-center py-16">
                            <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Coupons Available</h3>
                            <p className="text-gray-600">Create your first coupon to get started</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Coupon Code</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Discount</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coupons.map((coupon) => (
                                            <tr key={coupon._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                                                            <Tag className="w-5 h-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-gray-900 text-lg">{coupon.couponCode}</span>
                                                            <div className="text-xs text-green-600 font-medium">Active</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <Percent className="w-4 h-4 text-green-500 mr-1" />
                                                        <span className="font-bold text-green-600 text-xl">{coupon.discount}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="text-gray-700">{coupon.description}</span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(coupon)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 group"
                                                        >
                                                            <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(coupon._id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 group"
                                                        >
                                                            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden p-4 space-y-4">
                                {coupons.map((coupon) => (
                                    <div key={coupon._id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                                                    <Tag className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{coupon.couponCode}</h3>
                                                    <div className="flex items-center mt-1">
                                                        <Percent className="w-4 h-4 text-green-500 mr-1" />
                                                        <span className="font-bold text-green-600 text-lg">{coupon.discount}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-4">{coupon.description}</p>
                                        
                                        <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                            <button
                                                onClick={() => handleEdit(coupon)}
                                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <Edit3 className="w-4 h-4 mr-2" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(coupon._id)}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </button>
                                        </div>
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

export default ManageCoupons;