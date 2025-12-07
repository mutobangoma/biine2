import React from "react";

export default function StoreDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Store Dashboard</h1>

      <div className="space-y-4">
        <div className="border p-4 rounded">Store analytics</div>
        <div className="border p-4 rounded">Your active ads</div>
        <div className="border p-4 rounded">Subscription status</div>
      </div>
    </div>
  );
}
