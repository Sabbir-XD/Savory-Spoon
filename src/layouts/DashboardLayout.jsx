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

      
    </div>
  );
};

export default DashboardLayout;
