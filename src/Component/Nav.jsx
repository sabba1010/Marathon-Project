import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: 'success',
        title: 'Logged out!',
        text: 'See you again soon!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded hover:text-green-600 hover:bg-base-200 transition ${
      isActive ? 'text-green-600 font-semibold bg-base-200' : 'text-base-content'
    }`;

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4">
      <div className="container mx-auto w-full flex items-center justify-between py-2">
        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-green-600">
            🏃 Marathon
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex navbar-center">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium items-center">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/marathons" className={navLinkClass}>Marathons</NavLink></li>
            {user && (
              <li
                className="relative"
                onMouseEnter={() => setDashboardOpen(true)}
                onMouseLeave={() => setDashboardOpen(false)}
              >
                <button className="flex items-center gap-1">
                  Dashboard <ChevronDown className="w-4 h-4" />
                </button>
                {dashboardOpen && (
                  <ul className="absolute top-8 left-0 bg-base-100 text-base-content rounded shadow p-2 z-40 min-w-[180px]">
                    <li><NavLink to="/dashboard/my-marathons" className="block px-3 py-1 hover:bg-base-200 rounded">My Marathons</NavLink></li>
                    <li><NavLink to="/dashboard/add-marathon" className="block px-3 py-1 hover:bg-base-200 rounded">Add Marathon</NavLink></li>
                    <li><NavLink to="/dashboard/profile" className="block px-3 py-1 hover:bg-base-200 rounded">Profile</NavLink></li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex navbar-end gap-2 font-medium items-center">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user.displayName || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline text-red-500 border-red-300 hover:bg-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <NavLink to="/register" className={navLinkClass}>Register</NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden navbar-end">
          <button className="btn btn-ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-base-100 text-base-content">
          <ul className="menu rounded-box w-full font-medium items-center">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/marathons" className={navLinkClass}>Marathons</NavLink></li>
            {user && (
              <>
                <li className="font-semibold mt-2">Dashboard</li>
                <li><NavLink to="/dashboard/my-marathons" className={navLinkClass}>My Marathons</NavLink></li>
                <li><NavLink to="/dashboard/add-marathon" className={navLinkClass}>Add Marathon</NavLink></li>
                <li><NavLink to="/dashboard/profile" className={navLinkClass}>Profile</NavLink></li>
              </>
            )}
            {user ? (
              <>
                <li className="mt-2 text-center font-medium text-green-600">
                  {user.displayName || user.email}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline text-red-500 border-red-300 hover:bg-red-100 w-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                <li><NavLink to="/register" className={navLinkClass}>Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;

