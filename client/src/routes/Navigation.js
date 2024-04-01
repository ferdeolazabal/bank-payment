// @ts-nocheck
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Logo, PayIcon, PieIcon, UserIcon } from "../components/UiElements";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Users from "../components/Users";
import Payments from "../components/Payments";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <div
          className={`${"block"} fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`}
        ></div>

        <div
          className={`"fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in"${"translate-x-0 ease-out"}`}
        >
          <div class="flex items-center justify-center mt-8">
            <div class="flex items-center">
              <Logo />
              <span class="mx-2 text-2xl font-semibold text-white">
                Paymelo
              </span>
            </div>
          </div>

          <nav class="mt-10">
            <NavLink
              to="/home"
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            >
              <PieIcon />
              <span class="mx-3">Home</span>
            </NavLink>

            <NavLink
              to="/payments"
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            >
              <PayIcon />
              <span class="mx-3">Pagos</span>
            </NavLink>

            <NavLink
              to="/users"
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 mb-4"
            >
              <UserIcon />
              <span class="mx-3">Usuarios</span>
            </NavLink>
          </nav>
        </div>

        <Routes>
          <Route path="payments" element={<Payments />} />
          <Route path="users" element={<Users />} />
          <Route path="/home" element={<h1>Home Page</h1>} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
