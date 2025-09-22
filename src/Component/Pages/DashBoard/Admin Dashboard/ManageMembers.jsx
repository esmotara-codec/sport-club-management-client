import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/asioxSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Search, Users, Trash2, Crown, Mail, User } from 'lucide-react';

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: members = [], isLoading, error } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get('/members');
            console.log('Fetched members:', res.data);
            return res.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (memberId) => {
            const res = await axiosSecure.delete(`/members/${memberId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('members');
            toast.success('Member deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete member');
        }
    });

    const handleDelete = (memberId) => {
        Swal.fire({
            title: 'Remove Member',
            text: "Are you sure you want to remove this member? ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, Remove',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(memberId);
                Swal.fire({
                    title: 'Removed!',
                    text: 'Member has been removed successfully.',
                    icon: 'success',
                    confirmButtonColor: '#10B981'
                });
            }
        });
    };

    const filteredMembers = members.filter(member =>
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading members...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Users className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Error loading members</p>
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
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Manage Members</h1>
                                    <p className="text-gray-600 mt-1">View and manage club members</p>
                                </div>
                            </div>
                            
                            {/* Search Bar */}
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-blue-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-800 text-sm">Total Members</p>
                                        <p className="text-2xl font-bold">{members.length}</p>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>

                {/* Members List */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {filteredMembers.length === 0 ? (
                        <div className="text-center py-16">
                            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {searchTerm ? 'No members found' : 'No members available'}
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm ? 'Try adjusting your search terms' : 'No members have been added yet'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Info</th>
                                            <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                                            <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMembers.map((member) => (
                                            <tr key={member._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                                                            <User className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                                            <div className="flex items-center mt-1">
                                                                <Crown className="w-3 h-3 text-purple-500 mr-1" />
                                                                <span className="text-xs text-purple-600 font-medium">Premium Member</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center">
                                                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-gray-700">{member.email}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center">
                                                        <button
                                                            onClick={() => handleDelete(member._id)}
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
                                {filteredMembers.map((member) => (
                                    <div key={member._id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                                                    <User className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                                    <div className="flex items-center mt-1 mb-2">
                                                        <Crown className="w-3 h-3 text-purple-500 mr-1" />
                                                        <span className="text-xs text-purple-600 font-medium">Premium Member</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                                        <span className="text-sm text-gray-700">{member.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(member._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
                                            >
                                                <Trash2 className="w-4 h-4" />
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

export default ManageMembers;