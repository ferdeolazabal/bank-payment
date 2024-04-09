// @ts-nocheck
import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../components/Layout";
import LoginScreen from "../components/Login/LoginScreen";

const AppRouter = () => {
  const token = localStorage.getItem("token") || null;

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            component={LoginScreen}
            isAuthenticated={!!token}
          />

          <PrivateRoute
            path="/payments"
            component={Layout}
            isAuthenticated={!!token}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
