import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function useLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const snap = await getDocs(collection(db, "locations"));
        setLocations(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching locations", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  return { locations, loading };
}
