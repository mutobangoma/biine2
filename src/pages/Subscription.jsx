import React from "react";

export default function Subscription() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subscription Plans</h1>

      <div className="grid gap-4">
        <div className="border p-4 rounded">
          <h2 className="font-semibold">Free Tier</h2>
          <p>Basic posting + limited visibility</p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="font-semibold">Premium</h2>
          <p>Boost ads, storefront, more visibility</p>
        </div>
      </div>
    </div>
  );
}
