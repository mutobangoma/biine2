import React, { useState } from "react";

export default function StoreEditor({ store, onSave }) {
  const [title, setTitle] = useState(store?.title || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...store, title });
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Store title"
      />
      <button type="submit">Save</button>
    </form>
  );
}
