// @ts-nocheck
import React from "react";
import { BrowserRouter, NavLink, Route, Redirect } from "react-router-dom";
import { Logo, PayIcon, UserIcon } from "../components/UiElements";
import { useDispatch } from "react-redux";
import { startLogout } from "../redux/actions/auth";

import PaymentsScreen from "../components/Payments/PaymentsScreen";
import UsersScreen from "../components/Users/UsersScreen";
import LoginScreen from "../components/Login/LoginScreen";

const linkClass =
  "flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 cursor-pointer";

const Navigation = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <div className="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in translate-x-0 ease-out">
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <Logo />
              <span className="mx-2 text-2xl font-semibold text-white">
                Paymelo
              </span>
            </div>
          </div>

          <nav className="mt-10">
            <NavLink to="/payments" className={linkClass}>
              <PayIcon />
              <span className="mx-3">Pagos</span>
            </NavLink>

            <NavLink to="/users" className={linkClass}>
              <UserIcon />
              <span className="mx-3">Usuarios</span>
            </NavLink>
            <div className={linkClass} onClick={handleLogout}>
              <UserIcon />
              <span className="mx-3">Salir</span>
            </div>
          </nav>
        </div>

        <div className="flex-1">
          <Route path="/payments" component={PaymentsScreen} />
          <Route path="/users" component={UsersScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/*" render={() => <Redirect to="/payments" />} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Navigation;
