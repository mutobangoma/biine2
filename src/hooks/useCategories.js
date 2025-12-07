import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "categories"));
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(list);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
      setLoading(false);
    }

    load();
  }, []);

  return { categories, loading };
}
