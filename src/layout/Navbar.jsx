// src/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import SearchBar from "../components/SearchBar";
import AuthButtons from "../components/AuthButtons";
import useGeoLocation from "../hooks/useGeoLocation";


export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // FIX: Vite env variable
  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { city = "Zambia", loading: locLoading } = useGeoLocation(GOOGLE_KEY);

  const handleSearchSubmit = (value) => {
    if (!value) return;
    navigate(`/ads?search=${encodeURIComponent(value)}`);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Biine Logo" className="h-10" />
            <span className="font-semibold text-lg hidden sm:inline">Biine Market Place</span>
          </Link>
        </div>

        {/* Desktop search */}
        <div className="hidden md:block w-1/2">
          <SearchBar onSubmit={handleSearchSubmit} />
        </div>

        <div className="flex items-center gap-4">

          {/* Location */}
          <div className="hidden sm:flex items-center gap-1 text-sm text-gray-700">
            <MapPin className="w-4 h-4" />
            <span>{locLoading ? "Detecting..." : city}</span>
          </div>

          {/* Post Ad */}
          <Link
            to="/post"
            className="hidden md:inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-green-700 transition"
          >
            Post Free Ad
          </Link>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <AuthButtons
              onGoogle={() => navigate("/auth?mode=google")}
              onEmail={() => navigate("/auth?mode=email")}
              onPhone={() => navigate("/auth?mode=phone")}
            />
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen((s) => !s)}>
            {open ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* Mobile Panel */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t bg-white">
          <SearchBar
            onSubmit={(v) => {
              setOpen(false);
              handleSearchSubmit(v);
            }}
          />

          <div className="flex items-center justify-between">
            <Link to="/post" className="px-4 py-2 bg-green-600 text-white rounded">
              Post Ad
            </Link>
            <Link
              to="/auth"
              className="px-4 py-2 border rounded"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              📍 {locLoading ? "Detecting..." : city}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
