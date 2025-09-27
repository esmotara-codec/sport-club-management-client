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
import PrivateRoute from "./PrivateRoute";
import { AdminRoutes } from "./AdminRoutes";
import PublicCourtsPage from "../Pages/CourtPage/PublicCourtsPage";
import OthersProfile from "../Pages/DashBoard/Profile/OthersProfile";
import PendingBookings from "../Pages/DashBoard/Admin Dashboard/PendingBookings";
import Announcements from "../Pages/Announcements/Announcements";
import ApprovedBookings from "../Pages/DashBoard/MemberDashboard/ApprovedBookings";
import Payment from "../Pages/Payment/Payment";
import ConfirmedBookings from "../Pages/DashBoard/MemberDashboard/ConfirmedBookings";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "court-list",
        element: <PublicCourtsPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      ...AdminRoutes,
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <OthersProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "pending-bookings",
        element: <PendingBookings/>,
      },
      {
        path: "announcements",
        element: <Announcements/>,
      },
      {
        path: "approved-bookings",
        element: <ApprovedBookings/>,
      },
      {
        path: "payment/:id",
        element: <Payment/>,
      },
      {
        path: "confirmed-bookings",
        element: <ConfirmedBookings/>,
      },
    ],
    // [
    //     {
    //         index:true,
    //         element: <DashboardHome/>
    //     },
    //     {
    //       path: "admin",
    //       element: <PrivateRoute><adminRoutes/></PrivateRoute>,
    //     },
    //     {
    //         path: "user",
    //         element: <PrivateRoute><UserDashboard/></PrivateRoute>,
    //     },
    //     {
    //         path: "member",
    //         element: <MemberDashboard/>
    //     },

    // ]
  },
]);

export default routes;
