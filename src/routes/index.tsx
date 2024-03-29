import { Switch, useLocation } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Route } from "./Route";
import { AnimatePresence } from "framer-motion";

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Switch key={location.pathname} location={location}>
        <Route exact path="/" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
      </Switch>
    </AnimatePresence>
  );
};
