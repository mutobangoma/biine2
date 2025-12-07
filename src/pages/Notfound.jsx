// src/pages/notfound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-semibold mb-4">404 — Page Not Found</h1>
      <p className="mb-6 text-gray-600">The page you are looking for doesn’t exist.</p>

      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
