// @ts-nocheck
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../redux/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(({ auth }) => auth.name) || [];

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
  };
  return (
    <div className="flex flex-col justify-end flex-1 overflow-hidden">
      <header className="flex items-center justify-end px-6 py-4 bg-white border-b-4 border-indigo-600">
        <div className="flex justify-center">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none lg:hidden">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="relative mx-4 lg:mx-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <input
                className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
                type="text"
                placeholder="Search"
              />
            </div>
            <div className="mx-5 capitalize">{authUser}</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Salir
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
