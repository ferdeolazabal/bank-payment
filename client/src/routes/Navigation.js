// @ts-nocheck
import React, { useState } from "react";
import { BrowserRouter, NavLink, Route, Redirect } from "react-router-dom";
import { Logo, PayIcon, UserIcon } from "../components/UiElements";
import { useDispatch } from "react-redux";
import { startLogout } from "../redux/actions/auth";
import PaymentsScreen from "../components/Payments/PaymentsScreen";
import UsersScreen from "../components/Users/UsersScreen";
import LoginScreen from "../components/Login/LoginScreen";
import PieIcon from "../components/UiElements/PieIcon";

const linkClass =
  "flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 cursor-pointer";

const Navigation = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 ${
            sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
          } lg:translate-x-0 lg:static lg:inset-0`}
        >
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
              <PieIcon />
              <span className="mx-3">Pagos</span>
            </NavLink>
            <NavLink to="/users" className={linkClass}>
              <PayIcon />
              <span className="mx-3">Usuarios</span>
            </NavLink>
            <div className={linkClass} onClick={handleLogout}>
              <UserIcon />
              <span className="mx-3">Salir</span>
            </div>
          </nav>
        </div>
        <div className="flex-1 relative">
          <button
            className="lg:hidden fixed top-4 left-4 z-40 bg-gray-900 text-white p-2 rounded-md"
            onClick={handleToggleSidebar}
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${
                sidebarOpen ? "transform rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="p-4 lg:p-8">
            <Route path="/payments" component={PaymentsScreen} />
            <Route path="/users" component={UsersScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="*" render={() => <Redirect to="/payments" />} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Navigation;
