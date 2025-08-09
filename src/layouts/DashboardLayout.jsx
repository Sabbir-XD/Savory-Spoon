import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router";
import DashboardNav from "../pages/Dashboard/DashboardNav";
import { useMediaQuery } from "react-responsive";
import Dark from "../components/dark";

const DashboardLayout = () => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [drawerOpen, setDrawerOpen] = useState(true);

  // Automatically close/open drawer on device change
  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }, [isMobile]);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar / Drawer */}
      <DashboardNav
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        isMobile={isMobile}
      />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          drawerOpen && !isMobile ? "lg:ml-64" : ""
        }`}
      >
        {/* Mobile Header */}
        {isMobile && (
          <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between lg:hidden">
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-md bg-amber-500 text-gray-900 focus:outline-none"
            >
              {drawerOpen ? (
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <Link
              to="/"
              className="text-xl font-bold text-gray-800 dark:text-white"
            >
              Savory Spoon
            </Link>
            <div className="w-6">
              <Dark />
            </div>
          </header>
        )}

        {/* Main Content */}
        <main>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
