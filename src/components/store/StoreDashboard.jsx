import React from "react";

export default function StoreDashboard({ stores, onEdit }) {
  return (
    <div className="store-dashboard">
      {stores.map((store) => (
        <div key={store.id}>
          <StoreCard store={store} onClick={onEdit} />
        </div>
      ))}
    </div>
  );
}
