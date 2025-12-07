// src/components/CountryCodeDropdown.jsx
import React from "react";

const codes = [
  { name: "Zambia", code: "+260" },
  { name: "Malawi", code: "+265" },
  { name: "Tanzania", code: "+255" },
  { name: "Botswana", code: "+267" },
  { name: "Zimbabwe", code: "+263" },
  { name: "Namibia", code: "+264" },
  { name: "DR Congo", code: "+243" },
  { name: "Angola", code: "+244" },
];

export default function CountryCodeDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2 bg-white"
      aria-label="Country code"
    >
      {codes.map((c) => (
        <option key={c.code} value={c.code}>
          {c.name} ({c.code})
        </option>
      ))}
    </select>
  );
}
