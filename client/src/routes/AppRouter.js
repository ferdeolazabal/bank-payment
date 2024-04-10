// @ts-nocheck
import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "../components/Layout";
import LoginScreen from "../components/Login/LoginScreen";

const AppRouter = () => {
  const uid = useSelector((state) => state.auth.uid);
  const token = localStorage.getItem("token");
  const isAuthenticated = !!uid || !!token;

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            component={LoginScreen}
            isAuthenticated={isAuthenticated}
          />

          <PrivateRoute
            path="/payments"
            component={Layout}
            isAuthenticated={isAuthenticated}
          />

          <Redirect to={isAuthenticated ? "/payments" : "/login"} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
