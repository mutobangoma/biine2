// src/pages/Storefront.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import StoreCard from "../components/store/StoreCard";

export default function Storefront() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const snapshot = await getDocs(collection(db, "stores"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStores(data);
      } catch (err) {
        console.error("Error fetching stores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <p>Loading stores...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Demo Stores</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stores.map(store => (
          <StoreCard
            key={store.id}
            store={{
              title: store.name,
              ownerName: store.ownerId,
              ...store
            }}
            onClick={(s) => alert(`Clicked store: ${s.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
