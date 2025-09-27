import React, { useContext, useState, useRef } from 'react';
import useAxiosSecure from '../../../hook/asioxSecure';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaFutbol, FaUser, FaCalendarAlt, FaUserTag } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthContext';
import EditAdminProfileModal from './EditAdminProfileModal';
import defaultavatar from "./../../../../assets/3837171.png";
import { Camera } from 'lucide-react';
import useRole from '../../../hook/useRole';
import axios from 'axios';

const OthersProfile = () => {
    const { user } = useContext(AuthContext);
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);

    const mutation = useMutation({
        mutationFn: (updatedProfile) => axiosSecure.patch(`/users/update-profile`, updatedProfile),
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            setIsUploading(false);
        },
        onError: () => {
            setIsUploading(false);
        }
    });

    const handleCameraClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            try {
                const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, formData);
                const photoURL = res.data.secure_url;
                mutation.mutate({ photoURL });
            } catch (error) {
                console.error('Error uploading image:', error);
                setIsUploading(false);
            }
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Format registration date (assuming it's available in user object)
    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-32"></div>
                    
                    <div className="p-8 -mt-16 relative">
                        {/* Edit Profile Button - Top Right */}
                        <button 
                            onClick={openModal} 
                            className="absolute top-4 right-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 z-10"
                        >
                            Edit Profile
                        </button>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                            
                            {/* Left Column - Profile Image & Account Info */}
                            <div className="flex flex-col items-center lg:items-start space-y-6">
                                
                                {/* Profile Image Section */}
                                <div className="relative">
                                    <div className="relative w-40 h-40">
                                        <img 
                                            src={user?.photoURL || defaultavatar} 
                                            alt="Profile" 
                                            className={`w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg ${isUploading ? 'opacity-50' : ''}`} 
                                        />
                                        {isUploading && (
                                            <div className="absolute inset-0 flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            className="hidden" 
                                            accept="image/*" 
                                        />
                                        <button 
                                            onClick={handleCameraClick} 
                                            className="absolute bottom-2 right-2 bg-blue-600 p-3 rounded-full text-white hover:bg-blue-700 shadow-lg transition-colors duration-200"
                                        >
                                            <Camera size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Account Details Card */}
                                <div className="w-full bg-gray-50 rounded-lg p-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                                        <FaUser className="mr-2 text-slate-600" />
                                        Account Information
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <FaCalendarAlt className="text-slate-500 w-4 h-4" />
                                            <div>
                                                <p className="text-sm text-slate-500">Registered</p>
                                                <p className="font-medium text-slate-800">
                                                    {formatDate(user?.metadata?.creationTime || user?.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <FaUserTag className="text-slate-500 w-4 h-4" />
                                            <div>
                                                <p className="text-sm text-slate-500">User Role</p>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
                                                    {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()  || 'User'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                                            <div>
                                                <p className="text-sm text-slate-500">Status</p>
                                                <p className="font-medium text-emerald-600">Active</p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Name, Email & Actions */}
                            <div className="flex flex-col justify-center space-y-6">
                                
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <div>
                                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                                            {user?.displayName || 'User Name'}
                                        </h1>
                                        <p className="text-xl text-slate-600">
                                            {user?.email || 'user@example.com'}
                                        </p>
                                    </div>
                                    
                                    {/* Additional Info */}
                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-slate-500">Account Type</p>
                                                <p className="font-semibold text-slate-800">
                                                    {role === 'admin' ? 'Administrator' : 'Premium User'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500">Last Login</p>
                                                <p className="font-semibold text-slate-800">
                                                    {formatDate(user?.metadata?.lastSignInTime) || 'Recently'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <EditAdminProfileModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default OthersProfile;