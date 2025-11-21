import React from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();


  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Biine Logo" className="h-12" />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search cars, phones, property..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-12 pr-4 py-2 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
            />
            <Search className="absolute left-4 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 text-gray-600 font-medium">
            <MapPin className="h-5 w-5 text-green-600" />
            Lusaka
          </div>

          {/* Login / User */}
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-1 text-gray-700 hover:text-green-600 transition"
            >
              <User className="h-5 w-5" />
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden md:block">
                Hi, {user.email || user.phoneNumber}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-green-600"
              >
                Logout
              </button>
            </div>
          )}

          {/* Post Free Ad */}
          <Link
            to="/post"
            className="bg-green-600 text-white px-5 py-2 rounded-xl shadow-sm 
                       hover:bg-green-700 transition font-semibold text-sm"
          >
            Post Free Ad
          </Link>
        </div>
      </div>
    </nav>
  );
}
