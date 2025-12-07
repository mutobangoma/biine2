// src/pages/AdList.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/filters/FilterSidebar";
import { useParams } from "react-router-dom";

export default function AdList() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const { category: categorySlug } = useParams();

  // TODO: replace below with real Firestore query using these params
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="md:col-span-1">
        <FilterSidebar initial={{ category, min, max }} />
      </aside>

      <main className="md:col-span-3">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Results</h2>
          <p className="text-sm text-gray-600">{search ? `Search: "${search}"` : "All ads"}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* placeholder cards */}
          <div className="border rounded p-3">Ad 1</div>
          <div className="border rounded p-3">Ad 2</div>
          <div className="border rounded p-3">Ad 3</div>
          <div className="border rounded p-3">Ad 4</div>
          <div className="border rounded p-3">Ad 5</div>
        </div>
      </main>
    </div>
  );
}
