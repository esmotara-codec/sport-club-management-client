import {  LayoutDashboard, Package, User, User2, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import useRole from "../../hook/useRole";
import { useContext } from "react";
import Loading from "../../shared/Loading/Loading";


  const SidebarItems = [
    {
      name: "Home",
      path: "dashboard-home",
      icon: <UserRound className="size-5" />,
    },
    {
      name: "All Users",
      path: "/usrs",
      icon: <User className="size-5" />,
    },
   
     {
      name: "Profile",
      path: "/p",
      icon: <User2 className="size-5" />,
    },
      
  ];
const Sidebar = () => {
  const {role} = useRole();
  const {loading} = useContext(AuthContext);
  console.log(role);

  if(loading){
    return <Loading/>
  }



  return (
      <aside>
      {/* Logo */}
      <div className="flex items-center ml-10 mb-10">
        <Link to="/">
          <h1 className="text-3xl font-semibold text-white mt-5 inline-flex items-center gap-1">
            <span>
              {" "}
             Sport<span className="text-white ">Club</span>
            </span>
          </h1>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="space-y-8 p-4 overflow-y-auto">
      
        <div>
          <h3 className="text-xs uppercase text-white-300 font-semibold mb-4">
          {role} Dashboard
          </h3>

          <div className=" flex flex-col gap-2 ">
            {/* Transport Section */}
            <div>
              <div className="ml-4 mt-2 flex flex-col gap-5">
                {SidebarItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-white hover:text-yellow-400 hover:rounded-lg py-1 px-2 transition-colors duration-200 flex gap-2  items-center"
                  >
                    {item.icon} {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
