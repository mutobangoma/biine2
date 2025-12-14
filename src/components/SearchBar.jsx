// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  value: controlledValue,
  onChange = () => {},
  onSubmit = () => {},
  placeholder = "Search items, categories or location..."
}) {
  const [internal, setInternal] = useState("");

  const value = controlledValue !== undefined ? controlledValue : internal;

  const handleInput = (e) => {
    const val = e.target.value;
    if (controlledValue !== undefined) onChange(val);
    else setInternal(val);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      onSubmit(value);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          className="w-full rounded-full pl-12 pr-4 py-3 border border-bordergray focus:outline-none focus:ring-2 focus:ring-primary"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKey}
          placeholder={placeholder}
        />
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={() => onSubmit(value)}
        >
          <Search className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
