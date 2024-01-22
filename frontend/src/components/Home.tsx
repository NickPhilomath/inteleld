import { Navigate } from "react-router-dom";

const Home = () => {
  const localAuth = window.localStorage.getItem("auth");
  if (localAuth) return <Navigate to="/drivers" />;
  return <Navigate to="/login" />;
};

export default Home;
