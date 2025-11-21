import React, { useState } from "react";
import { auth, db, storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function StoreSetup() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!auth.currentUser) return alert("Please log in");
    setLoading(true);
    try {
      const storeRef = doc(collection(db, "stores"));
      let imageUrl = "";
      if (imageFile) {
        const storageRef = ref(storage, `stores/${storeRef.id}/store.jpg`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      await setDoc(storeRef, {
        ownerId: auth.currentUser.uid,
        name,
        description: desc,
        storeImage: imageUrl,
        keywords: keywords.split(",").map(k => k.trim().toLowerCase()),
        createdAt: serverTimestamp(),
        slug: name.toLowerCase().replace(/\s+/g, "-")
      });
      navigate(`/store/${storeRef.id}`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create Storefront</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Store name" className="input"/>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="input mt-2"/>
      <input value={keywords} onChange={e=>setKeywords(e.target.value)} placeholder="keywords comma separated" className="input mt-2"/>
      <input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} className="mt-2"/>
      <button onClick={handleCreate} className="btn btn-primary mt-3" disabled={loading}>{loading ? "Creating..." : "Create Store"}</button>
    </div>
  );
}
