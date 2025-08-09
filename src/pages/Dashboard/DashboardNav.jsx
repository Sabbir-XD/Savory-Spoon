import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaUtensils,
  FaPlusCircle,
  FaClipboardList,
  FaUser,
  FaStar,
  FaHeart,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import useApplicationApi from "../../Hooks/useApplicationApi";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Dark from "../../components/dark";

const DashboardNav = ({ isOpen, onClose, isMobile }) => {
  const navigate = useNavigate();
  const { user, handleLogoutUser } = useAuth();
  const { fetchOrders } = useApplicationApi();

  const { data: orders = []} = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: () => fetchOrders(user?.email),
    enabled: !!user?.email,
  });

  const DashboardLinks = [
    {
      to: "/dashboard",
      icon: <FaHome />,
      label: "Dashboard Home",
      exact: true,
    },
    { to: "/dashboard/MyFood", icon: <FaUtensils />, label: "My Foods" },
    { to: "/dashboard/AddFood", icon: <FaPlusCircle />, label: "Add Food" },
    {
      to: "/dashboard/MyOrders",
      icon: <FaClipboardList />,
      label: "My Orders",
      badge: `${orders.length}`, // Example badge, can be dynamic
    },
    { to: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
    { to: "/dashboard/reviews", icon: <FaStar />, label: "My Reviews" },
    { to: "/dashboard/favorites", icon: <FaHeart />, label: "Favorites" },
  ];

  const handleLogout = () => {
    handleLogoutUser();
    navigate("/login");
  };


  // Active and common styles
  const activeStyle = "bg-amber-500 text-gray-900 font-medium";
  const linkClasses =
    "flex items-center p-3 rounded-lg hover:bg-amber-500 hover:text-gray-900 transition-all duration-300";

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          bg-gradient-to-b from-gray-800 to-gray-900
          text-amber-50 w-64 p-4 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 p-2 border-b border-amber-500">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-amber-400">
              Savory Spoon
            </Link>
            <div className="ml-3 hidden md:inline"><Dark/></div>
          </div>
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-amber-400 hover:text-amber-500 hover:bg-gray-700"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="h-[calc(100%-180px)] overflow-y-auto custom-scrollbar pr-1">
          <ul className="space-y-1">
            {DashboardLinks.map(({ to, icon, label, exact, badge }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `${linkClasses} ${isActive ? activeStyle : ""}`
                  }
                  onClick={isMobile ? onClose : undefined}
                >
                  {icon}
                  <span className="ml-3">{label}</span>
                  {badge && (
                    <span className="ml-auto bg-amber-500 text-gray-900 px-2 rounded-full text-xs">
                      {badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile + Logout */}
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-gray-900 font-bold">
                U
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-gray-400">Premium Member</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-amber-400 hover:text-amber-500 hover:bg-gray-600 rounded-full transition-colors duration-200"
              title="Logout"
            >
              <FaSignOutAlt className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardNav;
