import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-green-700">🏃 Marathon Dashboard</h1>

        <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link
            to="/dashboard/add-marathon"
            className={`px-4 py-2 rounded ${
              isActive("/dashboard/add-marathon")
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            Add Marathon
          </Link>

          <Link
            to="/dashboard/my-marathons"
            className={`px-4 py-2 rounded ${
              isActive("/dashboard/my-marathons")
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            My Marathon List
          </Link>

          <Link
            to="/dashboard/my-profile"
            className={`px-4 py-2 rounded ${
              isActive("/dashboard/my-profile")
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            My Profile
          </Link>

          <Link
            to="/dashboard/my-applications"
            className={`px-4 py-2 rounded ${
              isActive("/dashboard/my-applications")
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            My Apply List
          </Link>
        </nav>
      </header>

      {/* Main Outlet */}
      <main className="p-6 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © 2025 Marathon Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;
