import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export const useSubscription = (userId) => {
  const [subStatus, setSubStatus] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const ref = doc(db, "subscriptions", userId);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setSubStatus(snap.data().status);
      } else {
        setSubStatus("free");
      }
      setLoading(false);
    });

    return () => unsub();
  }, [userId]);

  return {
    subStatus,
    subLoading: loading
  };
};
