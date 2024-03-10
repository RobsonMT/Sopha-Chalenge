import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
