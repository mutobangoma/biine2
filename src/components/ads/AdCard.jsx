// src/components/ads/AdCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { getAdImage } from "../../utils/getAdImage";

export default function AdCard({ ad }) {
  return (
    <Link
      to={`/ad/${ad.id}`}
      className="relative block bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border"
    >
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-100">
        <img
          src={getAdImage(ad)}
          alt={ad.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Demo badge */}
      {ad.isDemo && (
        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
          Demo
        </span>
      )}

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

        <p className="text-xs text-gray-500">
          Category: {ad.category}
        </p>
      </div>
    </Link>
  );
}
