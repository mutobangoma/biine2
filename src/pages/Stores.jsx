import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StoreCard from "../components/store/StoreCard";
import StoreEditor from "../components/store/StoreEditor";

import { createStore, getAllStores } from "../firebase/firestore/stores";
import { uploadFile } from "../firebase/storage";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [editingStore, setEditingStore] = useState(null);

  const [canCreate, setCanCreate] = useState(false);

  const { user, signIn } = useAuth();

  /* -------------------- Fetch Stores -------------------- */
  const fetchStores = async () => {
    setLoading(true);
    try {
      const data = await getAllStores();
      setStores(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading stores:", err);
      setError("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  /* -------------------- Determine Create Permission -------------------- */
  useEffect(() => {
    if (loading) return;

    // Not logged in → allow (will prompt login on click)
    if (!user) {
      setCanCreate(true);
      return;
    }

    const userStores = stores.filter(
      (store) => store.ownerId === user.uid
    );

    setCanCreate(userStores.length < 10);
  }, [user, stores, loading]);

  /* -------------------- Create Store -------------------- */
  const handleCreateStore = async (storeData) => {
    if (!user) {
      return signIn();
    }

    const userStores = stores.filter(
      (store) => store.ownerId === user.uid
    );

    if (userStores.length >= 10) {
      alert("You have reached the maximum of 10 stores for the free trial.");
      return;
    }

    try {
      let logoUrl = "";
      let bannerUrl = "";

      if (storeData.logoFile) {
        logoUrl = await uploadFile(
          `stores/${user.uid}/logo-${Date.now()}`,
          storeData.logoFile
        );
      }

      if (storeData.bannerFile) {
        bannerUrl = await uploadFile(
          `stores/${user.uid}/banner-${Date.now()}`,
          storeData.bannerFile
        );
      }

      const storeId = `${storeData.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}`;

      await createStore(storeId, {
        ...storeData,
        ownerId: user.uid,
        logoUrl,
        bannerUrl,
        createdAt: new Date(),
        subscription: {
          type: "free-trial",
          expiresAt: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
          ),
        },
      });

      alert("Store created successfully!");
      setCreating(false);
      setEditingStore(null);
      fetchStores();
    } catch (err) {
      console.error("Error creating store:", err);
      alert("Failed to create store.");
    }
  };

  /* -------------------- UI -------------------- */
  if (loading) return <div className="p-6">Loading stores...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Stores on Biine</h1>
          <p className="text-gray-600">
            Browse verified sellers and business storefronts
          </p>
        </div>

        {canCreate && (
          <button
            onClick={() => {
              setCreating(true);
              setEditingStore({});
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create New Store
          </button>
        )}
      </header>

      {creating && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Create Your Store
          </h2>
          <StoreEditor
            store={editingStore || {}}
            onSave={handleCreateStore}
          />
        </div>
      )}

      {stores.length === 0 ? (
        <p className="text-gray-500">No stores available yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {stores.map((store) => (
            <Link to={`/store/${store.id}`} key={store.id}>
              <StoreCard store={store} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
