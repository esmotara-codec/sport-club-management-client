
import React, { useContext, useState, useRef } from 'react';
import useCourts from '../../../hook/useCourts';
import useAxiosSecure from '../../../hook/asioxSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaFutbol, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthContext';
import EditAdminProfileModal from './EditAdminProfileModal';
import defaultavatar from "./../../../../assets/3837171.png";
import { Camera } from 'lucide-react';
import useRole from '../../../hook/useRole';
import axios from 'axios';

const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const { role } = useRole();
    const [courts] = useCourts();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: members = [] } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get('/members');
            return res.data;
        }
    });

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
            formData.append('image', file);

            try {
                const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
                const photoURL = res.data.data.url;
                mutation.mutate({ photoURL });
            } catch (error) {
                console.error('Error uploading image:', error);
                setIsUploading(false);
            }
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row items-center md:space-x-8">
                            <div className="relative w-32 h-32 mb-4 md:mb-0">
                                <img src={user?.photoURL || defaultavatar} alt="Admin" className={`w-32 h-32 rounded-full object-cover ${isUploading ? 'opacity-50' : ''}`} />
                                {isUploading && <div className="absolute inset-0 flex justify-center items-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div></div>}
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                <button onClick={handleCameraClick} className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700">
                                    <Camera size={20} />
                                </button>
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-800">{user?.displayName || 'Admin'}</h2>
                                <p className="text-gray-500 mt-1">{user?.email}</p>
                                <p className="text-gray-600 mt-2 font-semibold">Role: <span className="font-normal text-blue-500">{role}</span></p>
                                <button onClick={openModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                        <FaFutbol className="text-4xl text-blue-500" />
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Total Courts</p>
                            <p className="text-3xl font-bold text-gray-800">{courts.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                        <FaUser className="text-4xl text-green-500" />
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Total Users</p>
                            <p className="text-3xl font-bold text-gray-800">{users.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                        <FaUser className="text-4xl text-yellow-500" />
                        <div>
                            <p className="text-lg font-semibold text-gray-700">Total Members</p>
                            <p className="text-3xl font-bold text-gray-800">{members.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <EditAdminProfileModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default AdminProfile;
