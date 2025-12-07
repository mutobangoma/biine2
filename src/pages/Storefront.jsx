import React from "react";
import { useParams } from "react-router-dom";

export default function Storefront() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Storefront — {id}</h1>

      <div className="border p-4 rounded mb-4">Store info</div>
      <div className="border p-4 rounded">Store ads appear here</div>
    </div>
  );
}
