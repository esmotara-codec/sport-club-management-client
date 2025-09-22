import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, DollarSign, Calendar, X } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import useCourts from '../../hook/useCourts';
import Loading from '../../shared/Loading/Loading';
import useAxiosSecure from '../../hook/asioxSecure';
import Swal from 'sweetalert2';

const PublicCourtsPage = () => {
    const [courts, isLoading] = useCourts();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedCourt, setSelectedCourt] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    if (isLoading) {
        return <Loading />;
    }

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

    const handleBookNow = (court) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setSelectedCourt(court);
        setSelectedSlot(null);
        setSelectedDate('');
        setIsBookingModalOpen(true);
    };

    const handleSlotChange = (slot) => {
        setSelectedSlot(slot);
    };

    const calculateTotalPrice = () => {
        if (!selectedCourt || !selectedSlot) return 0;
        return selectedCourt.pricePerSession;
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        
        const bookingData = {
            courtId: selectedCourt._id,
            courtName: selectedCourt.courtType,
            courtImage: selectedCourt.courtImage,
            time: selectedSlot,
            date: selectedDate,
            totalPrice: calculateTotalPrice(),
            status: 'pending',
            userEmail: user.email
        };

        try {
            await axiosSecure.post('/create-bookings', bookingData);
            Swal.fire(
                'Success!',
                'Booking request submitted! Waiting for admin approval.',
                'success'
            );
        } catch (error) {
            console.error('Error submitting booking request:', error);
            Swal.fire(
                'Error!',
                'Failed to submit booking request.',
                'error'
            );
        }
        
        // Close modal and reset
        setIsBookingModalOpen(false);
        setSelectedCourt(null);
        setSelectedSlot(null);
        setSelectedDate('');
    };

    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Courts</h1>
                        <p className="text-gray-600 text-lg">Book your favorite sports court and enjoy your game</p>
                    </div>

                    {/* Courts Grid */}
                    {courts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🏟️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courts Available</h3>
                            <p className="text-gray-600">Check back later for available courts</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courts.map((court) => (
                                <div key={court._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    {/* Court Image */}
                                    <div className="relative h-48">
                                        <img 
                                            src={court.courtImage} 
                                            alt={court.courtType}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full p-2">
                                            <span className="text-2xl">{getCourtTypeIcon(court.courtType)}</span>
                                        </div>
                                    </div>

                                    {/* Court Details */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{court.courtType} Court</h3>
                                        
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                                <span className="text-sm font-medium">{court.slotTime}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="w-4 h-4 text-green-500" />
                                                <span className="text-2xl font-bold text-green-600">{court.pricePerSession}</span>
                                                <span className="text-gray-500 ml-1">/ session</span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => handleBookNow(court)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Modal */}
            {isBookingModalOpen && selectedCourt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-900">Book Court Session</h2>
                            <button 
                                onClick={() => setIsBookingModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
                            {/* Court Info (Read-only) */}
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                <img 
                                    src={selectedCourt.courtImage} 
                                    alt={selectedCourt.courtType}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <span className="text-xl mr-2">{getCourtTypeIcon(selectedCourt.courtType)}</span>
                                        {selectedCourt.courtType} Court
                                    </h3>
                                    <p className="text-gray-600">Base price: ${selectedCourt.pricePerSession} per session</p>
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={getMinDate()}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Time Slots Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    Select Time Slot
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[selectedCourt.slotTime].map((slot) => (
                                        <label key={slot} className="relative cursor-pointer">
                                            <input
                                                type="radio"
                                                name="time-slot"
                                                checked={selectedSlot === slot}
                                                onChange={() => handleSlotChange(slot)}
                                                className="sr-only peer"
                                            />
                                            <div className="p-3 border-2 border-gray-200 rounded-lg text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                                                <span className="text-sm font-medium text-gray-700 peer-checked:text-blue-700">
                                                    {slot}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {!selectedSlot && (
                                    <p className="text-red-500 text-sm mt-2">Please select a time slot</p>
                                )}
                            </div>

                            {/* Price Summary */}
                            <div className="bg-blue-50 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">Selected Slots:</span>
                                    <span className="font-semibold">{selectedSlot ? 1 : 0}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-700">Price per Slot:</span>
                                    <span className="font-semibold">${selectedCourt.pricePerSession}</span>
                                </div>
                                <hr className="my-2 border-blue-200" />
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total Price:</span>
                                    <span className="text-2xl font-bold text-blue-600">${calculateTotalPrice()}</span>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsBookingModalOpen(false)}
                                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!selectedSlot || !selectedDate}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                                >
                                    Submit Booking Request
                                </button>
                            </div>

                            {/* Info Note */}
                            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium mb-1">Please note:</p>
                                <ul className="space-y-1 text-xs">
                                    <li>• Your booking request will be sent to admin for approval</li>
                                    <li>• Booking status will be "pending" until approved</li>
                                    <li>• After approval, you will become a member</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PublicCourtsPage;