import { Routes, Route, useLocation } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import SignUp from "../pages/SignUp";

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
