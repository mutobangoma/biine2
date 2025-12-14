// src/components/store/SubscriptionPlans.jsx
import React, { useState } from "react";

export default function SubscriptionPlans({ plans, onSelect }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (plan) => {
    setSelectedId(plan.id);
    onSelect(plan);
  };

  if (!plans || plans.length === 0) {
    return <p className="text-gray-500">No subscription plans available.</p>;
  }

  return (
    <div className="subscription-plans grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => handleSelect(plan)}
          className={`plan border rounded p-4 cursor-pointer transition shadow ${
            selectedId === plan.id ? "border-blue-600 bg-blue-50" : "hover:shadow-lg"
          }`}
        >
          <h4 className="font-semibold">{plan.name}</h4>
          <p className="text-gray-600">${plan.price.toFixed(2)} / {plan.duration}</p>
        </div>
      ))}
    </div>
  );
}
