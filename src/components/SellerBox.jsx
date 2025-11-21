// src/components/SellerBox.jsx
import React from "react";

export default function SellerBox({ seller = { name: "John Doe", since: "Member since 2021", phone: "+260978..." } }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-biine">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">JD</div>
        <div>
          <div className="font-medium text-gray-900">{seller.name}</div>
          <div className="text-sm text-gray-500">{seller.since}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-gray-600">Contact seller</div>
        <a href={`tel:${seller.phone}`} className="btn btn-primary w-full mt-3 text-center">{seller.phone}</a>
      </div>
    </div>
  );
}
