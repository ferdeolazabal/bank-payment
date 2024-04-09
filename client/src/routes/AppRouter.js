// @ts-nocheck
import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../components/Layout";
import LoginScreen from "../components/Login/LoginScreen";

const AppRouter = () => {
  // @ts-ignore
  const user = useSelector(({ auth }) => auth.user);
  console.log("user", user);
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!user?._id}
          />

          <PrivateRoute
            path="/payment"
            component={Layout}
            isAuthenticated={!!user?._id}
          />
          <Redirect to="/payment" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
