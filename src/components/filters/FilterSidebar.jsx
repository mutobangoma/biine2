// src/components/filters/FilterSidebar.jsx
import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

export default function FilterSidebar({ initial = {} }) {
  const [category, setCategory] = useState(initial.category || "");
  const [min, setMin] = useState(initial.min || "");
  const [max, setMax] = useState(initial.max || "");
  const navigate = useNavigate();

  const apply = () => {
    const params = {};
    if (category) params.category = category;
    if (min) params.min = min;
    if (max) params.max = max;
    navigate({ pathname: "/ads", search: createSearchParams(params).toString() });
  };

  return (
    <div className="p-3 border rounded space-y-3">
      <h3 className="font-semibold">Filters</h3>

      <div>
        <label className="text-sm">Category</label>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="input mt-1 w-full">
          <option value="">Any</option>
          <option value="cars">Cars</option>
          <option value="property">Property</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Price min</label>
        <input value={min} onChange={(e)=>setMin(e.target.value)} className="input mt-1 w-full" placeholder="0" />
      </div>

      <div>
        <label className="text-sm">Price max</label>
        <input value={max} onChange={(e)=>setMax(e.target.value)} className="input mt-1 w-full" placeholder="999999" />
      </div>

      <div className="flex gap-2">
        <button onClick={apply} className="btn btn-primary">Apply</button>
        <button onClick={() => { setCategory(""); setMin(""); setMax(""); navigate("/ads"); }} className="btn">Reset</button>
      </div>
    </div>
  );
}
