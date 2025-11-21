import React from "react";

const Input = ({ label, ...props }) => (
  <div className="flex flex-col space-y-1 mb-3">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input className="input" {...props} />
  </div>
);

export default Input;
