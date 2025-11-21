// src/components/ListingCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ id = "1", title = "Sample Item", price = "ZMW 3,500", image = "/img/placeholder.jpg", location = "Lusaka", timeAgo = "2d" }) {
  return (
    <Link to={`/ad/${id}`} className="block">
      <div className="bg-white rounded-2xl shadow-biine overflow-hidden hover:shadow-md transition">
        <div className="h-44 bg-gray-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="text-sm text-gray-500">{location} • {timeAgo}</div>
            <div className="text-sm text-gray-500">💬 3</div>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
          <div className="mt-3 text-lg font-bold text-primary">{price}</div>
        </div>
      </div>
    </Link>
  );
}
