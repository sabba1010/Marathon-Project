import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="drawer lg:drawer-open bg-gray-100 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar for mobile */}
        <div className="w-full bg-white shadow-sm flex items-center justify-between px-4 py-3 lg:hidden">
          <label htmlFor="dashboard-drawer" className="btn btn-sm btn-outline">
            ☰ Menu
          </label>
          <h1 className="text-lg font-bold text-green-700">🏃 Marathon Dashboard</h1>
        </div>

        {/* Page Content */}
        <main className="p-4 flex-grow">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
          © 2025 Marathon Management System. All rights reserved.
        </footer>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 bg-white text-base-content shadow-lg">
          <h2 className="text-xl font-bold text-green-700 mb-4">🏃 Dashboard</h2>

          <li>
            <Link
              to="/dashboard/add-marathon"
              className={isActive("/dashboard/add-marathon") ? "bg-green-600 text-white" : ""}
            >
              Add Marathon
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-marathons"
              className={isActive("/dashboard/my-marathons") ? "bg-green-600 text-white" : ""}
            >
              My Marathon List
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/profile"
              className={isActive("/dashboard/profile") ? "bg-green-600 text-white" : ""}
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-applications"
              className={isActive("/dashboard/my-applications") ? "bg-green-600 text-white" : ""}
            >
              My Apply List
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
