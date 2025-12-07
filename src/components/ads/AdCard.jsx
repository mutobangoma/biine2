import React from "react";
import { Link } from "react-router-dom";

export default function AdCard({ ad }) {
  return (
    <Link
      to={`/ad/${ad.id}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border"
    >
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-100">
        {ad.images?.[0] ? (
          <img
            src={ad.images[0]}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
          {ad.title}
        </h3>

        {ad.price && (
          <p className="text-green-700 font-bold text-lg mb-1">
            ZMW {Number(ad.price).toLocaleString()}
          </p>
        )}

        <p className="text-xs text-gray-500">Category: {ad.category}</p>
      </div>
    </Link>
  );
}
