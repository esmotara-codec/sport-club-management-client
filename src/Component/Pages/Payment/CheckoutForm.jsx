import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect, useContext } from "react";
import useAxiosSecure from "../../hook/asioxSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { Mail, MapPin, Clock, Calendar, DollarSign, CreditCard, Tag, CheckCircle } from "lucide-react";

const CheckoutForm = ({ court, selectedDate, selectedTime, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(price);
  const [error, setError] = useState("");

  useEffect(() => {
    if (discountedPrice > 0) {
      axiosSecure.post("/create-payment-intent", { price: discountedPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          setError("Failed to initialize payment");
        });
    }
  }, [axiosSecure, discountedPrice]);

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      Swal.fire("Error!", "Please enter a coupon code.", "error");
      return;
    }

    try {
      const response = await axiosSecure.post("/validate-coupon", { coupon });
      if (response.data.valid) {
        const discount = response.data.discount;
        const newPrice = price - (price * discount) / 100;
        setDiscountedPrice(newPrice);
        Swal.fire({
          icon: "success",
          title: "Coupon Applied!",
          text: `${discount}% discount applied successfully!`,
          confirmButtonColor: "#10B981"
        });
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
      setError("Stripe has not loaded yet. Please wait.");
      return;
    }

    if (!clientSecret) {
      setError("Payment initialization failed. Please refresh and try again.");
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setError("Card element not found.");
      return;
    }

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
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
        courtName: court.courtType || court.name,
        selectedDate: selectedDate,
        selectedTime: selectedTime,
        status: "pending",
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your booking has been confirmed.",
            confirmButtonColor: "#10B981"
          });
        }
      } catch (error) {
        console.error("Error saving payment:", error);
        setError("Payment succeeded but failed to save booking. Please contact support.");
      }
    }
  };

  // Handle missing data
  if (!court || !selectedDate || !selectedTime || !price) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl">
        <p className="text-red-500 font-semibold">Missing booking information. Please go back and try again.</p>
      </div>
    );
  }

console.log("Stripe loaded:", !!stripe);
console.log("Client Secret:", clientSecret);
console.log("Button should be enabled:", !!(stripe && clientSecret));


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2">
            <Mail className="w-4 h-4 text-white" />
          </div>
          Email Address
        </label>
        <input 
          type="email" 
          value={user?.email || ""} 
          readOnly 
          className="w-full p-3 pl-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 font-medium focus:outline-none" 
        />
      </div>

      {/* Court Type Field */}
      <div className="group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-2">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          Court Type
        </label>
        <input 
          type="text" 
          value={court?.courtType || court?.name || "Court information not available"} 
          readOnly 
          className="w-full p-3 pl-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-purple-50 text-gray-700 font-medium focus:outline-none" 
        />
      </div>

      {/* Time Slot Field */}
      <div className="group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-2">
            <Clock className="w-4 h-4 text-white" />
          </div>
          Time Slot(s)
        </label>
        <input 
          type="text" 
          value={selectedTime || "Time not selected"} 
          readOnly 
          className="w-full p-3 pl-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-green-50 text-gray-700 font-medium focus:outline-none" 
        />
      </div>

      {/* Date Field */}
      <div className="group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-2">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          Booking Date
        </label>
        <input 
          type="text" 
          value={selectedDate || "Date not selected"} 
          readOnly 
          className="w-full p-3 pl-4 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-orange-50 text-gray-700 font-medium focus:outline-none" 
        />
      </div>

      {/* Price Field */}
      <div className="group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-2">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          Total Price
        </label>
        <div className="relative">
          <input 
            type="text" 
            value={`$${discountedPrice?.toFixed(2) || '0.00'}`} 
            readOnly 
            className="w-full p-3 pl-4 pr-16 border-2 border-emerald-200 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 font-bold text-xl focus:outline-none" 
          />
          {discountedPrice < price && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              SAVED ${(price - discountedPrice).toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Coupon Code Field */}
      <div className="group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mr-2">
            <Tag className="w-4 h-4 text-white" />
          </div>
          Have a Coupon?
        </label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={coupon} 
            onChange={(e) => setCoupon(e.target.value)} 
            placeholder="Enter coupon code"
            className="flex-1 p-3 pl-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 bg-white" 
          />
          <button 
            type="button" 
            onClick={handleApplyCoupon} 
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:from-pink-600 hover:to-rose-700 focus:ring-2 focus:ring-pink-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Card Details Field */}
      <div className="group">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mr-2">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          Card Details
        </label>
        <div className="p-5 border-2 border-indigo-200 rounded-xl shadow-sm bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 hover:border-indigo-300 transition-all duration-200">
          <CardElement 
            options={{ 
              style: { 
                base: { 
                  fontSize: "16px", 
                  color: "#1e293b",
                  fontWeight: "500",
                  fontFamily: '"Inter", "Segoe UI", sans-serif',
                  "::placeholder": { 
                    color: "#94a3b8" 
                  },
                  iconColor: "#6366f1"
                }, 
                invalid: { 
                  color: "#ef4444",
                  iconColor: "#ef4444"
                },
                complete: {
                  iconColor: "#10b981"
                }
              } 
            }} 
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
          Your payment information is secure and encrypted
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={!stripe || !clientSecret} 
        className="w-full py-4 px-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-green-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center"
      >
        {!stripe || !clientSecret ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Loading...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Complete Payment ${discountedPrice?.toFixed(2) || '0.00'}
          </>
        )}
      </button>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Secure Payment
        </div>
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
          <CreditCard className="w-3 h-3" />
          256-bit Encryption
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;