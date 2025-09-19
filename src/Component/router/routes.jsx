import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import ErrorElement from "../Pages/ErrorPage/ErrorElement";

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
]);

export default routes;
