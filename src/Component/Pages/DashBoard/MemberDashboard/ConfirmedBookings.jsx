import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hook/asioxSecure';

const ConfirmedBookings = () => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  const fetchConfirmedBookings = async () => {
    try {
      const { data } = await axiosSecure.get('/confirmed-bookings');
      setConfirmedBookings(data);
    } catch (error) {
      console.error('Error fetching confirmed bookings:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Confirmed Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Court Type</th>
              <th className="py-2 px-4 border-b">Slot Time</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {confirmedBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">{booking.courtType}</td>
                <td className="py-2 px-4 border-b">{booking.time}</td>
                <td className="py-2 px-4 border-b">${booking.totalPrice}</td>
                <td className="py-2 px-4 border-b">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfirmedBookings;
