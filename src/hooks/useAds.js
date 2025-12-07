import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

export const useAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "ads"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAds(list);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const createAd = async (data) => {
    return await addDoc(collection(db, "ads"), {
      ...data,
      createdAt: new Date()
    });
  };

  const updateAd = async (id, data) => {
    return await updateDoc(doc(db, "ads", id), data);
  };

  const removeAd = async (id) => {
    return await deleteDoc(doc(db, "ads", id));
  };

  return {
    ads,
    loading,
    createAd,
    updateAd,
    removeAd
  };
};
