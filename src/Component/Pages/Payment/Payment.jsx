
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const { court, selectedDate, selectedTime, price } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Complete Your Payment
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            court={court}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            price={price}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;