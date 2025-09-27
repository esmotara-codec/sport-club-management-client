import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/asioxSecure';

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    handlePayment();
  }, []);

  const handlePayment = async () => {
    try {
      await axiosSecure.post(`/bookings/payment/${id}`);
      Swal.fire('Payment Successful!', 'Your booking has been confirmed.', 'success');
      navigate('/dashboard/confirmed-bookings');
    } catch (error) {
      console.error('Error processing payment:', error);
      Swal.fire('Payment Failed!', 'There was an error processing your payment.', 'error');
      navigate('/dashboard/approved-bookings');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
    </div>
  );
};

export default Payment;
