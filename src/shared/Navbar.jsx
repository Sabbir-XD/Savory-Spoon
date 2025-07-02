import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../src/assets/image/logo.png";
import useAuth from "../Hooks/useAuth";
import Dark from "../components/dark";

const Navbar = () => {
  const { user, handleLogoutUser } = useAuth();

  const links = (
    <>
      {user ? (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-amber-600 font-semibold dark:text-amber-400"
                : "hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            }
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        ""
      )}
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold dark:text-amber-400"
              : "hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/AllFoods"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold dark:text-amber-400"
              : "hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          }
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Gallery"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 font-semibold dark:text-amber-400"
              : "hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          }
        >
          Gallery
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-white dark:bg-gray-900 shadow transition-all duration-300 px-4 md:px-10">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost bg-amber-500 text-black lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white/95 dark:bg-gray-700/95 rounded-box w-52 backdrop-blur-md space-y-2"
          >
            {links}
            {user && (
              <li>
                <button
                  onClick={handleLogoutUser}
                  className="text-left w-full btn-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:scale-105 dark:from-amber-600 dark:to-amber-700"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Logo hidden on mobile */}
        <Link to="/" className="hidden lg:flex items-center">
          <img
            className="w-20 bg-amber-500 p-1 rounded-2xl mr-2"
            src={logo}
            alt="Savory Spoon Logo"
          />
        </Link>
      </div>

      {/* Desktop NavLinks */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-6 text-sm font-medium">
          {links}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-2">
        {/* Dark mode toggle */}
        <div>
          <Dark />
        </div>

        {/* Profile Avatar */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring-amber-500 dark:hover:ring-amber-400"
            >
              <div className="w-10 rounded-full ring ring-gray-300 dark:ring-gray-600 ring-offset-2">
                <img src={user.photoURL} alt="Profile" />
              </div>
            </div>
            {/* <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white/95 dark:bg-gray-700/95 rounded-box w-52 backdrop-blur-md"
            >
              <li>
                <NavLink to="/MyFood">My Food</NavLink>
              </li>
              <li>
                <NavLink to="/AddFood">Add Food</NavLink>
              </li>
              <li>
                <NavLink to="/MyOrders">My Orders</NavLink>
              </li>
            </ul> */}
          </div>
        )}

        {/* Logout button hidden on mobile */}
        {user ? (
          <button
            onClick={handleLogoutUser}
            className="hidden lg:inline-block btn bg-gradient-to-r from-amber-500 to-amber-600 text-white border-none hover:scale-105 dark:from-amber-600 dark:to-amber-700"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="btn bg-gradient-to-r from-amber-500 to-amber-600 text-white border-none hover:scale-105 dark:from-amber-600 dark:to-amber-700"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
