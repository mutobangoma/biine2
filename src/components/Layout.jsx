import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/" className="text-2xl font-bold">Biine</Link>
        <nav className="flex gap-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/post" className="hover:text-gray-200">Post Ad</Link>
          <Link to="/inbox" className="hover:text-gray-200">Messages</Link>
        </nav>
      </header>

      <main className="flex-1 p-4">{children}</main>

      {/* Simple AdSense slot placeholder */}
      <div className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        Advertisement space
      </div>

      <footer className="bg-primary text-white text-center p-3">
        © {new Date().getFullYear()} Biine. All rights reserved.
      </footer>
    </div>
  );
}
