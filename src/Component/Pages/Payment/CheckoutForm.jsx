import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect, useContext } from "react";
import useAxiosSecure from "../../hook/asioxSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const CheckoutForm = ({ court, selectedDate, selectedTime, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [error, setError] = useState("");


  // Debug: Log the court object to see its structure
  useEffect(() => {
    console.log("Court object:", court);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    console.log("Price:", price);
  }, [court, selectedDate, selectedTime, price]);


  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price: discountedPrice }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, discountedPrice, price]);

  const handleApplyCoupon = async () => {
    try {
      const response = await axiosSecure.post("/validate-coupon", { coupon });
      if (response.data.valid) {
        const discount = response.data.discount;
        const newPrice = price - (price * discount) / 100;
        setDiscountedPrice(newPrice);
        Swal.fire("Success!", "Coupon applied successfully!", "success");
      } else {
        Swal.fire("Error!", "Invalid coupon code.", "error");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      Swal.fire("Error!", "Could not validate coupon.", "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error: paymentMethodError} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        email: user.email,
        price: discountedPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        courtId: court._id,
        courtName: court.name,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        status: "pending",
      };

      const res = await axiosSecure.post("/payments", payment);
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire("Success!", "Payment successful!", "success");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" value={user?.email || ""} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Court Type</label>
        <input type="text" value={court?.name || ""} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Slots</label>
        <input type="text" value={selectedTime || ""} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input type="text" value={selectedDate || ""} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input type="text" value={`${discountedPrice}` || ""} readOnly className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
        <div className="flex">
          <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          <button type="button" onClick={handleApplyCoupon} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md">Apply</button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Card Details</label>
        <CardElement options={{ style: { base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } }, invalid: { color: "#9e2146" } } }} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={!stripe || !clientSecret} className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 disabled:bg-gray-400">
         Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
