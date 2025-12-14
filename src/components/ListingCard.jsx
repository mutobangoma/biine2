// src/components/ListingCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ ad }) {
  if (!ad) return null;

  const slug =
    ad.slug ||
    ad.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <Link
      to={`/ad/${ad.id}-${slug}`}
      className="block bg-white rounded-2xl shadow-biine overflow-hidden hover:shadow-lg transition"
    >
      <div className="h-40 bg-gray-100">
        <img
          src={ad.images?.[0]?.url || "https://biine.app/og-default.jpg"}
          alt={ad.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{ad.title}</h3>
        <div className="text-sm text-gray-500 mt-1">{ad.location}</div>
        <div className="text-base font-bold text-primary mt-2">
          {ad.price ? `ZMW ${ad.price}` : "Contact Seller"}
        </div>
      </div>
    </Link>
  );
}
