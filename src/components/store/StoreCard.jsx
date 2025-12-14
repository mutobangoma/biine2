// src/components/store/StoreCard.jsx
import React from "react";

export default function StoreCard({ store, onClick }) {
  return (
    <div
      role="button"
      aria-label={`View store ${store.name}`}
      className="store-card border rounded overflow-hidden shadow hover:shadow-lg cursor-pointer transition-shadow duration-200"
      onClick={() => onClick(store)}
    >
      {/* Store banner */}
      <img
        loading="lazy"
        src={store.bannerUrl || "https://placehold.co/600x200"}
        alt={store.name}
        className="w-full h-32 object-cover"
      />

      {/* Store info */}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <img
            src={store.logoUrl || "https://placehold.co/80x80"}
            alt={`${store.name} logo`}
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <p className="text-sm text-gray-500">
              Owner: {store.ownerName || store.ownerId || "Unknown"}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-2">{store.description || "No description"}</p>
        <p className="text-xs text-gray-400">
          {store.location || "Unknown location"}
          {store.sublocation && ` - ${store.sublocation}`}
        </p>
      </div>
    </div>
  );
}
