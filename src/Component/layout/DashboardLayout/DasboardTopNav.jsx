import { Package, User } from "lucide-react";

const DasboardTopNav = ({ role, onSidebarToggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Package className="size-5 text-gray-600" />
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 capitalize">{role} Dashboard</span>
          <User className="size-6 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default DasboardTopNav;