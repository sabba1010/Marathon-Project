import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-6 mt-10 shadow-inner">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <Link to="/" className="text-2xl font-bold text-green-600">
            🏃 Marathon
          </Link>
          <p className="mt-2 text-sm">
            Manage and participate in exciting marathons effortlessly. Run, register, and stay updated with us!
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Useful Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
            <li><Link to="/marathons" className="hover:text-green-600 transition">Marathons</Link></li>
            <li><Link to="/login" className="hover:text-green-600 transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-green-600 transition">Register</Link></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="md:text-right">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} 🏃 Marathon. All rights reserved.
          </p>
          <p className="text-sm mt-1">Developed with ❤️ by Sabba Hossain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

