import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/asioxSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Bell, Plus, Edit3, Trash2, MessageCircle, FileText, Calendar, X } from 'lucide-react';
import EditAnnouncementModal from './EditAdmin/EditAnnouncementModal';


const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const { data: announcements = [], isLoading, error } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/announcements');
            return res.data;
        }
    });

    const addMutation = useMutation({
        mutationFn: async (newAnnouncement) => {
            const res = await axiosSecure.post('/announcements', newAnnouncement);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
            toast.success('Announcement added successfully');
            setTitle('');
            setDescription('');
        },
        onError: () => {
            toast.error('Failed to add announcement');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/announcements/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
            toast.success('Announcement deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete announcement');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addMutation.mutate({ title, description });
    };

    const handleEdit = (announcement) => {
        setSelectedAnnouncement(announcement);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Announcement',
            text: "Are you sure you want to delete this announcement? This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6B7280',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Announcement has been deleted successfully.',
                    icon: 'success',
                    confirmButtonColor: '#6B7280'
                });
            }
        });
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAnnouncement(null);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading announcements...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Bell className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600">Error loading announcements</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-red-600 rounded-xl flex items-center justify-center mr-4">
                                    <Bell className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Make Announcement</h1>
                                    <p className="text-gray-600 mt-1">Create and manage announcements for your members</p>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm">Total Announcements</p>
                                            <p className="text-2xl font-bold text-gray-800">{announcements.length}</p>
                                        </div>
                                        <MessageCircle className="w-8 h-8 text-gray-500" />
                                    </div>
                                </div>
                                {/* <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm">Recent Activity</p>
                                            <p className="text-2xl font-bold text-gray-800">
                                                {announcements.length > 0 ? formatDate(announcements[0].createdAt || new Date()) : 'None'}
                                            </p>
                                        </div>
                                        <Calendar className="w-8 h-8 text-gray-500" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Create Announcement Form */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <div className="flex items-center mb-6">
                                <Plus className="w-5 h-5 mr-2 text-gray-700" />
                                <h2 className="text-xl font-bold text-gray-900">Create New Announcement</h2>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FileText className="w-4 h-4 inline mr-1" />
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter announcement title..."
                                            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <MessageCircle className="w-4 h-4 inline mr-1" />
                                            Description
                                        </label>
                                        <textarea
                                            placeholder="Enter announcement description..."
                                            rows="5"
                                            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50 resize-none"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={addMutation.isLoading}
                                    className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center"
                                >
                                    {addMutation.isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Announcement
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Announcements List */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <Bell className="w-5 h-5 mr-2" />
                            All Announcements
                        </h2>

                        {announcements.length === 0 ? (
                            <div className="text-center py-16">
                                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Announcements Yet</h3>
                                <p className="text-gray-600">Create your first announcement to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {announcements.map((announcement) => (
                                    <div key={announcement._id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-10 h-10  bg-gradient-to-r from-amber-600 to-red-600 rounded-lg flex items-center justify-center">
                                                <Bell className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formatDate(announcement.createdAt || new Date())}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                                            {announcement.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                            {announcement.description}
                                        </p>
                                        
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(announcement)}
                                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <Edit3 className="w-4 h-4 mr-1" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(announcement._id)}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <EditAnnouncementModal
                isOpen={isEditModalOpen}
                announcement={selectedAnnouncement}
                onClose={handleCloseEditModal}
                axiosSecure={axiosSecure}
                queryClient={queryClient}
            />
        </>
    );
};

export default MakeAnnouncement;