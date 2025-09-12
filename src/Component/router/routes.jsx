import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      }
    ]
  },
]);

export default routes;
