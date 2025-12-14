import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Menu, X, Grid } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { useAuth } from "../context/AuthContext";
import useGeoLocation from "../hooks/useGeoLocation";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Mobile menu
  const [catOpen, setCatOpen] = useState(false); // Category grid
  const [categories, setCategories] = useState([]);
  const { user, logout } = useAuth();

  const { city = "Zambia", loading: locLoading } = useGeoLocation(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  );

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        setCategories(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  const btn =
    "bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-green-700 transition flex items-center gap-1";

  return (
    <header className="bg-[#2b3b33] text-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo.png" alt="Biine Logo" className="h-10 w-auto" />
          <span className="font-semibold text-lg hidden sm:inline">
            Biine Marketplace
          </span>
        </Link>

       {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* 1. Location */}
          <button className={btn}>
            <MapPin className="w-4 h-4" />
            {locLoading ? "Detecting…" : city}
          </button>

          {/* 2. Categories */}
          <div className="relative">
            <button onClick={() => setCatOpen((s) => !s)} className={btn}>
              <Grid className="w-4 h-4" /> Categories
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full mt-3 w-[720px] bg-white text-black rounded-2xl shadow-xl p-6 grid grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigate(`/ads/${cat.id}`);
                      setCatOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border hover:shadow-md transition"
                  >
                    <span className="font-semibold text-sm text-center">{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Post a Free Ad */}
          <Link to="/post-ad" className={btn}>Post Free Ad</Link>

          {/* 4. Stores */}
          <Link to="/stores" className={btn}>Stores</Link>

          {/* 5. Login / Logout */}
          {user ? (
            <button onClick={logout} className={btn}>Logout</button>
          ) : (
            <Link to="/login" className={btn}>Login</Link>
          )}
        </div>


        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white text-black px-4 py-4 space-y-3 border-t">
            {/* 1. Location */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
              <MapPin className="w-4 h-4" />
              {locLoading ? "Detecting…" : city}
            </div>

            {/* 2. Categories */}
            <button
              onClick={() => setCatOpen((s) => !s)}
              className="block w-full text-center bg-green-600 text-white py-2 rounded-full"
            >
              Categories
            </button>
            {catOpen && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigate(`/ads/${cat.id}`);
                      setOpen(false);
                      setCatOpen(false);
                    }}
                    className="bg-gray-100 rounded-lg p-3 text-sm font-semibold"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            {/* 3. Post a Free Ad */}
            <Link to="/post-ad" className="block text-center bg-green-600 text-white py-2 rounded-full">Post Free Ad</Link>

            {/* 4. Stores */}
            <Link to="/stores" className="block text-center bg-green-600 text-white py-2 rounded-full">Stores</Link>

            {/* 5. Login / Logout */}
            {user ? (
              <button onClick={logout} className="block w-full text-center bg-green-600 text-white py-2 rounded-full">Logout</button>
            ) : (
              <Link to="/login" className="block text-center border py-2 rounded-full">Login</Link>
            )}
          </div>
        )}

    </header>
  );
}
