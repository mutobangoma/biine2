import React from "react";

export default function StoreCard({ store, onClick }) {
  return (
    <div className="store-card" onClick={() => onClick(store)}>
      <h3>{store.title}</h3>
      <p>Owner: {store.ownerName}</p>
    </div>
  );
}
