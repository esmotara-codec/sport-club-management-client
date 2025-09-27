import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hook/asioxSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ApprovedBookings = () => {
  const [approvedBookings, setApprovedBookings] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchApprovedBookings();
  }, []);

  const fetchApprovedBookings = async () => {
    try {
      const { data } = await axiosSecure.get('/approved-bookings');
      setApprovedBookings(data);
    } catch (error) {
      console.error('Error fetching approved bookings:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to cancel this booking.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, cancel it!',
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/bookings/${bookingId}`);
        fetchApprovedBookings();
        Swal.fire('Cancelled!', 'The booking has been cancelled.', 'success');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      Swal.fire('Error!', 'Failed to cancel the booking.', 'error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Approved Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Court Type</th>
              <th className="py-2 px-4 border-b">Slot Time</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">{booking.courtType}</td>
                <td className="py-2 px-4 border-b">{booking.time}</td>
                <td className="py-2 px-4 border-b">${booking.totalPrice}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/dashboard/payment/${booking._id}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Pay</button>
                  </Link>
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedBookings;
