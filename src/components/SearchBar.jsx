// src/components/SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value = "", onChange = () => {}, placeholder = "Search items, categories or location..." }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          className="w-full rounded-full pl-12 pr-4 py-3 border border-bordergray focus:outline-none focus:ring-2 focus:ring-primary"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
