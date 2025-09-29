import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/asioxSecure";
import { FaTag } from "react-icons/fa";

export default function PromotionsSection() {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], isLoading, error } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-12 text-center text-gray-600">Loading promotions...</div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        Failed to load promotions
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="py-12 text-center text-gray-600">
        No active promotions available
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 py-12 px-6 my-12 rounded-2xl shadow-xl">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
        🎉 Special Promotions & Discount Coupons
      </h2>

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-lg relative overflow-hidden group"
          >
            {/* Icon */}
            <div className="absolute top-0 right-0 bg-yellow-400 p-2 rounded-bl-xl">
              <FaTag className="text-gray-800 text-xl" />
            </div>

            {/* Discount */}
            <h3 className="text-2xl font-bold text-pink-600 mb-2">
              {coupon.discount}% OFF
            </h3>

            {/* Description */}
            <p className="mb-4 text-gray-600">{coupon.description}</p>

            {/* Coupon Code */}
            <div className="border-dashed border-2 border-pink-500 rounded-lg px-4 py-2 font-mono text-lg text-pink-600 font-semibold text-center group-hover:bg-pink-50 transition">
              {coupon.couponCode}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
