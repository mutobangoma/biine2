// src/pages/AdList.jsx
import React, { useState } from "react";
import ListingCard from "../components/ListingCard";
import ListingFilter from "../components/ListingFilter";

const MOCK = new Array(12).fill(0).map((_, i) => ({
  id: String(i + 1),
  title: `Sample Item ${i + 1}`,
  price: `ZMW ${Math.floor(1000 + Math.random() * 15000)}`,
  image: "/img/placeholder.jpg",
  location: "Lusaka",
  timeAgo: `${1 + Math.floor(Math.random() * 7)}d`,
}));

export default function AdList() {
  const [listings] = useState(MOCK);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <ListingFilter />
      </div>

      <div className="md:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Results</h2>
          <div className="text-sm text-gray-600">Showing {listings.length} results</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings.map((l) => (
            <ListingCard key={l.id} {...l} />
          ))}
        </div>
      </div>
    </div>
  );
}
