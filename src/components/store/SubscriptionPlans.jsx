import React from "react";

export default function SubscriptionPlans({ plans, onSelect }) {
  return (
    <div className="subscription-plans">
      {plans.map((plan) => (
        <div key={plan.id} className="plan" onClick={() => onSelect(plan)}>
          <h4>{plan.name}</h4>
          <p>${plan.price} / {plan.duration}</p>
        </div>
      ))}
    </div>
  );
}
