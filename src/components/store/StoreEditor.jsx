// src/components/store/StoreEditor.jsx
import React, { useState } from "react";

export default function StoreEditor({ store = {}, onSave, user }) {
  const [name, setName] = useState(store.name || "");
  const [description, setDescription] = useState(store.description || "");
  const [location, setLocation] = useState(store.location || "");
  const [sublocation, setSublocation] = useState(store.sublocation || "");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Store name cannot be empty");

    if (!user) {
      // Prompt sign-in
      return alert("Please sign in to post your store");
    }

    // Prepare store data
    const newStore = {
      ...store,
      name: name.trim(),
      description,
      location,
      sublocation,
      logoFile,
      bannerFile,
    };

    onSave(newStore);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded shadow">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Store Name"
        className="border rounded p-2"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Store Description"
        className="border rounded p-2"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="border rounded p-2"
      />
      <input
        type="text"
        value={sublocation}
        onChange={(e) => setSublocation(e.target.value)}
        placeholder="Sublocation (optional)"
        className="border rounded p-2"
      />

      {/* Logo upload */}
      <div>
        <label className="block mb-1 font-semibold">Store Logo (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          className="border rounded p-2"
        />
        {logoFile && <p className="text-sm mt-1">{logoFile.name}</p>}
      </div>

      {/* Banner upload */}
      <div>
        <label className="block mb-1 font-semibold">Store Banner (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBannerFile(e.target.files[0])}
          className="border rounded p-2"
        />
        {bannerFile && <p className="text-sm mt-1">{bannerFile.name}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
      >
        Post Store
      </button>
    </form>
  );
}
