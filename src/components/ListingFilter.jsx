import React, { useState, useEffect } from "react";

export default function ListingFilter({ categories = [], onFilter = () => {} }) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [hasPhotos, setHasPhotos] = useState(false);

  const handleApply = () => {
    onFilter({
      category: selectedCategory !== "All Categories" ? selectedCategory : null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      hasPhotos,
    });
  };

  return (
    <aside className="w-full md:w-64 bg-white rounded-2xl shadow-biine p-4 space-y-4">
      <div>
        <h4 className="font-semibold text-gray-800">Filters</h4>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Category</label>
        <select
          className="w-full border border-bordergray rounded-xl p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All Categories</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-2">Price range</label>
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="Min"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            className="input"
            placeholder="Max"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasPhotos}
            onChange={(e) => setHasPhotos(e.target.checked)}
          />
          <span className="text-sm text-gray-700">Has photos</span>
        </label>
      </div>

      <div>
        <button onClick={handleApply} className="btn btn-primary w-full">
          Apply
        </button>
      </div>
    </aside>
  );
}
