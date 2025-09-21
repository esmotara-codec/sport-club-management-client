import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCourts from '../../../hook/useCourts';
import Loading from '../../../shared/Loading/Loading';
import { Plus, Edit3, Trash2, Clock, DollarSign, MapPin, Eye } from 'lucide-react';
import EditCourtModal from './EditAdmin/EditCourtModal'; // Import the modal component
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/asioxSecure';
 

const ManageCourts = () => {
    const [courts, isLoading, refetch] = useCourts();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const axiosSecure = useAxiosSecure();


    if (isLoading) {
        return <Loading />;
    }

    const handleEditClick = (court) => {
        setSelectedCourt(court);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedCourt(null);
    };

    const handleDeleteClick = (courtId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-court/${courtId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'The court has been deleted.',
                                'success'
                            );
                            refetch();
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting court:", error);
                        Swal.fire(
                            'Failed!',
                            'Could not delete the court.',
                            'error'
                        );
                    });
            }
        });
    };

    const getCourtTypeIcon = (courtType) => {
        const icons = {
            'Tennis': '🎾',
            'Badminton': '🏸',
            'Squash': '🏓',
            'Basketball': '🏀',
            'Volleyball': '🏐',
            'Football': '⚽',
            'Swimming': '🏊‍♂️',
        };
        return icons[courtType] || '🏟️';
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-500 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">Manage Courts</h1>
                                        <p className="text-gray-600 mt-1">View and manage all your sports courts</p>
                                    </div>
                                </div>
                                <Link 
                                    to="/dashboard/create-court" 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Create New Court
                                </Link>
                            </div>
                            
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-gradient-to-r from-gray-100 to-gray-100 rounded-xl p-4 text-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-800 text-sm">Total Courts</p>
                                            <p className="text-2xl font-bold">{courts.length}</p>
                                        </div>
                                        <MapPin className="w-8 h-8 text-blue-500" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-gray-100 to-gray-100 rounded-xl p-4 text-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-800 text-sm">Active Courts</p>
                                            <p className="text-2xl font-bold">{courts.length}</p>
                                        </div>
                                        <Eye className="w-8 h-8 text-gray-600" />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-gray-100 to-gray-100 rounded-xl p-4 text-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="ext-gray-800 text-sm">Avg. Price</p>
                                            <p className="text-2xl font-bold">
                                                ${courts.length > 0 ? Math.round(courts.reduce((sum, court) => sum + court.pricePerSession, 0) / courts.length) : 0}
                                            </p>
                                        </div>
                                        <DollarSign className="w-8 h-8 text-purple-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Courts Grid/Table */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {courts.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courts Found</h3>
                                <p className="text-gray-600 mb-6">Get started by creating your first court</p>
                              
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                {/* Desktop Table View */}
                                <div className="hidden lg:block">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Court</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Type</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Time Slot</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                                                <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courts.map((court) => (
                                                <tr key={court._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center">
                                                            <div className="relative">
                                                                <img 
                                                                    src={court.courtImage} 
                                                                    alt={court.courtType} 
                                                                    className="w-16 h-16 object-cover rounded-xl shadow-md" 
                                                                />
                                                                {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center">
                                                            <span className="text-2xl mr-3">{getCourtTypeIcon(court.courtType)}</span>
                                                            <span className="font-medium text-gray-900">{court.courtType}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center text-gray-700">
                                                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                                            <span className="font-medium">{court.slotTime}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center">
                                                            <DollarSign className="w-4 h-4 text-green-500" />
                                                            <span className="font-bold text-green-600 text-lg">{court.pricePerSession}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <button onClick={() => handleEditClick(court)} 
                                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 group">
                                                                <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                            </button>
                                                            <button 
                                                              onClick={() => handleDeleteClick(court._id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 group">
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
                                <div className="lg:hidden p-4 space-y-4">
                                    {courts.map((court, index) => (
                                        <div key={court._id} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-md border border-gray-100">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className="relative mr-4">
                                                        <img 
                                                            src={court.courtImage} 
                                                            alt={court.courtType} 
                                                            className="w-20 h-20 object-cover rounded-xl shadow-md" 
                                                        />
                                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">{index + 1}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center mb-2">
                                                            <span className="text-2xl mr-2">{getCourtTypeIcon(court.courtType)}</span>
                                                            <h3 className="text-xl font-bold text-gray-900">{court.courtType}</h3>
                                                        </div>
                                                        <div className="flex items-center text-gray-600 mb-1">
                                                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                                            <span className="text-sm font-medium">{court.slotTime}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <DollarSign className="w-4 h-4 text-green-500" />
                                                            <span className="font-bold text-green-600 text-lg">{court.pricePerSession}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                                <button onClick={() => handleEditClick(court)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                                                    <Edit3 className="w-4 h-4 mr-2" />
                                                    Edit
                                                </button>
                                                <button 
                                                onClick={() => handleDeleteClick(court._id)}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
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
            <EditCourtModal 
                isOpen={isEditModalOpen} 
                onClose={handleCloseModal} 
                court={selectedCourt} 
                refetch={refetch} 
            />
        </>
    );
};

export default ManageCourts;