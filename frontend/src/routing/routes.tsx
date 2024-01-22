import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Map from "../components/Map";
import Logs from "../components/Logs";
import Drivers from "../components/Drivers/Drivers";
import Trucks from "../components/Trucks/Trucks";
import PageNotFound from "../components/PageNotFound";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "map", element: <Map /> },
      { path: "logs", element: <Logs /> },
      { path: "drivers", element: <Drivers /> },
      { path: "trucks", element: <Trucks /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

export default router;
