// src/components/store/StoreManager.jsx
import React, { useState } from "react";
import StoreDashboard from "./StoreDashboard";
import StoreEditor from "./StoreEditor";
import SubscriptionPlans from "./SubscriptionPlans";

export default function StoreManager({ initialStores = [], subscriptionPlans = [] }) {
  const [stores, setStores] = useState(initialStores);
  const [editingStore, setEditingStore] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Handle when user clicks "edit" on a store
  const handleEditStore = (store) => {
    setEditingStore(store);
    setSelectedPlan(null); // reset selected plan when editing
  };

  // Handle saving store edits
  const handleSaveStore = (updatedStore) => {
    setStores((prev) =>
      prev.map((store) => (store.id === updatedStore.id ? updatedStore : store))
    );
    setEditingStore(null); // go back to dashboard
  };

  // Handle subscription selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  // Handle finalizing subscription
  const handleSubscribe = () => {
    if (!editingStore || !selectedPlan) return;
    alert(
      `Store "${editingStore.name}" subscribed to "${selectedPlan.name}" plan for $${selectedPlan.price}`
    );
    // Optionally save subscription to backend here
    setEditingStore(null);
    setSelectedPlan(null);
  };

  return (
    <div className="store-manager p-4">
      {!editingStore && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Stores</h2>
          <StoreDashboard stores={stores} onEdit={handleEditStore} />
        </div>
      )}

      {editingStore && (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Edit Store: {editingStore.name}</h2>
          <StoreEditor store={editingStore} onSave={handleSaveStore} />

          <div>
            <h3 className="text-xl font-semibold mt-4 mb-2">Select Subscription Plan</h3>
            <SubscriptionPlans plans={subscriptionPlans} onSelect={handleSelectPlan} />
            {selectedPlan && (
              <button
                onClick={handleSubscribe}
                className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                Subscribe to "{selectedPlan.name}"
              </button>
            )}
          </div>

          <button
            onClick={() => setEditingStore(null)}
            className="mt-2 text-gray-500 underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
