import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  useEffect(() => {
    window.localStorage.setItem("auth", "");
  }, []);
  return <Navigate to="/login" />;
};

export default Logout;
