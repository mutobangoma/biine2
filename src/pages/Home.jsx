// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AdUnit from "../components/ads/AdUnit";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="bg-gradient-to-r from-green-600 to-lime-500 py-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Buy & Sell in Zambia</h1>
        <p className="text-gray-600 mt-2">Simple classifieds for your local area.</p>

        <div className="mt-6 max-w-xl mx-auto">
          <SearchBar onSubmit={(v) => navigate(`/ads?search=${encodeURIComponent(v)}`)} />
        </div>
      </section>

      {/* Horizontal Ad Below Hero */}
      <div className="max-w-7xl mx-auto px-6">
        <AdUnit 
          adSlot="2146914081"
          format="auto"
          style={{ display: "block", margin: "20px auto" }}
        />
      </div>

      {/* Category strip placeholder */}
      <section className="mt-8">
        {/* keep your existing CategoryStrip component; it renders beneath navbar */}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Featured</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded p-3">Featured ad</div>
          <div className="border rounded p-3">Featured ad</div>
          <div className="border rounded p-3">Featured ad</div>
          <div className="border rounded p-3">Featured ad</div>
        </div>

        {/* Inline Ad under category grid */}
        <div className="mt-8">
          <AdUnit
            adSlot="3785081773"
            format="fluid"
            layoutKey="-gw-3+1f-3d+2z"
            style={{ display: "block" }}
          />
        </div>
      </section>
    </div>
  );
}
