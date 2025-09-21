import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import ErrorElement from "../Pages/ErrorPage/ErrorElement";
import UserDashboard from "../Pages/DashBoard/USerDashBoard/UserDashboard";
import MemberDashboard from "../Pages/DashBoard/MemberDashboard/MemberDashboard";
import DashboardLayout from "../layout/DashboardLayout/DashBoardLayout";
import { DashboardHome } from "../Pages/DashBoard/DashboardHome";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <ErrorElement/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "sign-up",
        element: <SignUp/>,
      }
    ]
  },
   {
        path: "dashboard",
        element: <DashboardLayout/>,
        children: [       
            {
                index:true,
                element: <DashboardHome/>
            },
            {
              path: "admin",
              element: <adminRoutes/>,
            },
            {
                path: "user",
                element: <UserDashboard/>
            },
            {
                path: "member",
                element: <MemberDashboard/>
            },
        ]    
    },
]);

export default routes;