// src/components/store/StoreDashboard.jsx
import React from "react";
import StoreCard from "./StoreCard";

export default function StoreDashboard({ stores, onEdit }) {
  if (!stores || stores.length === 0) {
    return <p className="text-gray-500">No stores available.</p>;
  }

  return (
    <div className="store-dashboard grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} onClick={onEdit} />
      ))}
    </div>
  );
}
