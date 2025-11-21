// src/components/ListingFilter.jsx
import React from "react";

export default function ListingFilter({ onFilter = () => {} }) {
  return (
    <aside className="w-full md:w-64 bg-white rounded-2xl shadow-biine p-4 space-y-4">
      <div>
        <h4 className="font-semibold text-gray-800">Filters</h4>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Category</label>
        <select className="w-full border border-bordergray rounded-xl p-2">
          <option>All Categories</option>
          <option>Cars</option>
          <option>Property</option>
          <option>Electronics</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Price range</label>
        <div className="flex gap-2">
          <input className="input" placeholder="Min" />
          <input className="input" placeholder="Max" />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          <span className="text-sm text-gray-700">Has photos</span>
        </label>
      </div>

      <div>
        <button onClick={onFilter} className="btn btn-primary w-full">Apply</button>
      </div>
    </aside>
  );
}
