import React from "react";
import AdCard from "./AdCard";

export default function AdGrid({ ads }) {
  if (!ads || ads.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No ads found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
