// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  value = "",
  onChange = () => {},
  onSubmit = () => {},
  placeholder = "Search items, categories or location..."
}) {
  const [q, setQ] = useState(value);

  return (
    <div className="w-full max-w-full">
      <div className="relative">
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); onChange(e.target.value); }}
          onKeyDown={(e) => { if (e.key === "Enter") onSubmit(q.trim()); }}
          placeholder={placeholder}
          className="w-full rounded-full pl-12 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
