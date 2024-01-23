import { createHashRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Map from "../components/Map";
import Drivers from "../components/Drivers/Drivers";
import DriverLogs from "../components/DriverLogs/DriverLogs";
import DriverLog from "../components/DriverLogs/DriverLog";
import Trucks from "../components/Trucks/Trucks";
import PageNotFound from "../components/PageNotFound";

const router = createHashRouter([
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "map", element: <Map /> },
      { path: "logs", element: <DriverLogs /> },
      { path: "logs/driver/:id", element: <DriverLog /> },
      { path: "drivers", element: <Drivers /> },
      { path: "trucks", element: <Trucks /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

export default router;
