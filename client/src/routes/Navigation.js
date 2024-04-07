// @ts-nocheck
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Logo, PayIcon, PieIcon, UserIcon } from "../components/UiElements";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import PaymentsScreen from "../components/Payments/PaymentsScreen";
import UsersScreen from "../components/Users/UsersScreen";
import LoginScreen from "../components/Login/LoginScreen";

const linkClass =
  "flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100";

export const Navigation = () => {
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
            {/* <NavLink to="/login" className={linkClass}>
              <PieIcon />
              <span className="mx-3">Login</span>
            </NavLink> */}

            <NavLink to="/home" className={linkClass}>
              <PieIcon />
              <span className="mx-3">Home</span>
            </NavLink>

            <NavLink to="/payments" className={linkClass}>
              <PayIcon />
              <span className="mx-3">Pagos</span>
            </NavLink>

            <NavLink to="/users" className={linkClass}>
              <UserIcon />
              <span className="mx-3">Usuarios</span>
            </NavLink>
          </nav>
        </div>

        <Routes>
          <Route path="payments" element={<PaymentsScreen />} />
          <Route path="users" element={<UsersScreen />} />
          {/* <Route path="login" element={<LoginScreen />} /> */}
          <Route path="/home" element={<h1>Home</h1>} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
