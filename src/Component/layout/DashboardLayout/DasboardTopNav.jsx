import { User, Menu } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

const DasboardTopNav = ({ role, onMenuClick }) => {
  const { signOutUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Sign out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between space-x-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle menu"
        >
          <Menu className="size-6 text-gray-600" />
        </button>

        <h2 className="text-xs md:text-sm text-gray-600 capitalize">
          Welcome to <span className="text-xs md:text-sm text-gray-600 capitalize">{role} Dashboard</span>
        </h2>
        
        <div className="relative">
          <div
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <User className="size-6 text-gray-600" />
          </div>
          
          {/* DropDown box */}
          {showDropdown && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[200px] md:w-[300px] z-10">
              <div>
                <strong className="text-base md:text-lg text-gray-700">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </strong>
              </div>
              
              <hr className="my-2" />
              <div className="mb-3">
                <button
                  onClick={() => handleSignOut()}
                  className="text-red-400 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DasboardTopNav;