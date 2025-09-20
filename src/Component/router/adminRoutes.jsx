import AdminDashBoard from "../Pages/DashBoard/Admin Dashboard/AdminDashBoard";
import CreateCourt from "../Pages/DashBoard/Admin Dashboard/CreateCourt";
import ManageBookings from "../Pages/DashBoard/Admin Dashboard/ManageBookings";
import ManageCoupons from "../Pages/DashBoard/Admin Dashboard/ManageCoupons";
import ManageCourts from "../Pages/DashBoard/Admin Dashboard/ManageCourts";
import ManageMembers from "../Pages/DashBoard/Admin Dashboard/ManageMembers";
import ManageUsers from "../Pages/DashBoard/Admin Dashboard/ManageUsers";
import MakeAnnouncement from "../Pages/DashBoard/Admin Dashboard/MakeAnnouncement";

export const adminRoutes = [
    {
        path: "admin",
        element: <AdminDashBoard/>,
    },
    {
        path: "manage-users",
        element: <ManageUsers/>,
    },
    {
        path: "manage-members",
        element: <ManageMembers/>,
    },
    {
        path: "manage-bookings",
        element: <ManageBookings/>,
    },
    {
        path: "manage-courts",
        element: <ManageCourts/>,
    },
    {
        path: "manage-coupons",
        element: <ManageCoupons/>,
    },
    {
        path: "make-announcement",
        element: <MakeAnnouncement/>,
    },
    {
        path: "create-court",
        element: <CreateCourt/>,
    },
];
