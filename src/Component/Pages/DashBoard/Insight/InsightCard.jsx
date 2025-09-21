import { ChevronRight } from "lucide-react";

const InsightCard = ({ title, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm opacity-90">{title}</p>
            <p className="text-3xl font-bold mt-1">{value.toLocaleString()}</p>
          </div>
          <div className="text-white text-opacity-80">
            {icon}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-600">
          <ChevronRight className="size-4 mr-1" />
          View Details
        </div>
      </div>
    </div>
  );
};
export default InsightCard ;