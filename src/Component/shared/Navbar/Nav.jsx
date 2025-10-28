import { useContext, useState } from "react";
import { Menu, Trophy, X } from "lucide-react";
import { Link } from "react-router";
import DynamicLink from "./DynamicLink";
import Container from "../../layout/Container";
import { AuthContext } from "../../Context/AuthContext";

import defaultavatar from "./../../../assets/3837171.png";
import Loading from "../Loading/Loading";
import useRole from "../../hook/useRole";

const navigationData = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Courts",
    path: "court-list",
  },
];

const Nav = () => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const { role } = useRole();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = navigationData.map((route) => (
    <DynamicLink key={route.id} route={route} />
  ));

  console.log("Nav user ", role);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

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
    <div className="bg-white text-primary relative shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-2">
          {/* Left Section: Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              {/* <img
                src={logo}
                alt="sportclub-Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-cover"
              /> */}

              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="size-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Sport<span className="text-blue-400">Club</span>
              </h1>
            </Link>
          </div>

          {/* Center Section: Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">{links}</ul>

          {/* Right Section: Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {loading ? null : !user ? (
              <div className="flex gap-2">
                <Link to="/login">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0e7aa8] transition-colors cursor-pointer">
                    Login
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0e7aa8] transition-colors">
                    Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <img
                      src={user.photoURL || defaultavatar}
                      alt="User Avatar"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                      title={user.displayName || user.name || "User"}
                    />
                  </div>
                </div>

                {/* DropDown box */}
                {showDropdown && (
                  <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-[300px] z-10">
                    <div>
                      <strong className="text-lg text-gray-700">
                        {role || user.displayName || user.name || "User"}
                      </strong>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-3">
                      <Link to="/dashboard">
                        <button className="text-gray-700">Dashboard</button>
                      </Link>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-3">
                      <button
                        onClick={() => handleSignOut()}
                        className="text-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden z-50 p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-full h-0.5 bg-gray-900 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Mobile Menu Drawer */}
          {isMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-100">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setIsMenuOpen(false)}
              ></div>

              {/* Slide-out Drawer */}
              <div
                className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  {/* Logo */}
                  <Link to="/" className="flex items-center gap-2">
                    {/* <img
                src={logo}
                alt="sportclub-Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-cover"
              /> */}

                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Trophy className="size-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      Sport<span className="text-blue-400">Club</span>
                    </h1>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
                    aria-label="Close menu"
                  >
                    <span className="text-3xl"> ✕</span>
                  </button>
                </div>

                {/* User Section */}
                <div className="p-1 py-2">
                  {loading ? null : !user ? (
                    <div className="flex justify-center pt-4">
                      <Link to="/login">
                        <button className="bg-primary text-white px-4 py-6 rounded-full text-sm font-medium hover:bg-[#0e7aa8] transition-colors cursor-pointer">
                          Login
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="relative cursor-pointer flex justify-center pt-4">
                      <Link to="/profile">
                        <img
                          src={user.photoURL || defaultavatar}
                          alt="User Avatar"
                          className="w-12 h-12 md:w-10 md:h-10  rounded-full object-cover"
                          title={user.displayName || user.name || "User"}
                        />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Menu Content */}
                <div className="flex flex-col h-full overflow-y-auto py-4">
                  <div className="pt-2 ">{links}</div>
                  {user && (
                    <div className="pt-2">
                      <div className="px-2">
                        <Link to="/dashboard">
                        <button
                          onClick={() => {
                              setIsMenuOpen(false);
                          }}
                          className=" text-[#108ac2] font-normal py-2 px-3 "
                        >
                          Dashboard
                        </button>
                     
                        </Link>
                      </div>
                    <div className="p-4">
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleSignOut();
                        }}
                        className=" w-full btn border border-none bg-primary text-white  text-base  font-normal py-2 px-3 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                     </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </div>
  );
};

export default Nav;
