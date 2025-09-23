import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Edit3, X, FileText, MessageCircle } from 'lucide-react';

const EditAnnouncementModal = ({ isOpen, announcement, onClose, axiosSecure, queryClient }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Update form when announcement changes
    useEffect(() => {
        if (announcement) {
            setTitle(announcement.title || '');
            setDescription(announcement.description || '');
        }
    }, [announcement]);

    const updateMutation = useMutation({
        mutationFn: async (updatedAnnouncement) => {
            const res = await axiosSecure.put(`/update-announcements/${announcement._id}`, updatedAnnouncement);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('announcements');
            toast.success('Announcement updated successfully');
            onClose();
        },
        onError: () => {
            toast.error('Failed to update announcement');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMutation.mutate({ title, description });
    };

    const handleClose = () => {
        setTitle('');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Edit3 className="w-6 h-6 mr-2" />
                        Edit Announcement
                    </h2>
                    <button 
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <form onSubmit={handleSubmit} className="p-6">
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
                                rows="6"
                                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50 resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateMutation.isLoading}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700  disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
                        >
                            {updateMutation.isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Update Announcement
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAnnouncementModal;