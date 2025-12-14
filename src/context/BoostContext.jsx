import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const BoostContext = createContext();

export const BoostProvider = ({ children }) => {
  const { user } = useAuth();
  const [boosts, setBoosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch boosts for the logged-in user
  useEffect(() => {
    if (!user) {
      setBoosts([]);
      return;
    }

    const q = query(
      collection(db, "boosts"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setBoosts(list);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  // Activate a boost for an ad
  const boostAd = async (adId, type = "premium") => {
    if (!user) throw new Error("Must be logged in");

    return await addDoc(collection(db, "boosts"), {
      adId,
      userId: user.uid,
      type,
      createdAt: serverTimestamp(),
      status: "active",
    });
  };

  // Deactivate / expire boost
  const deactivateBoost = async (boostId) => {
    await updateDoc(doc(db, "boosts", boostId), {
      status: "expired",
    });
  };

  return (
    <BoostContext.Provider
      value={{
        boosts,
        loading,
        boostAd,
        deactivateBoost,
      }}
    >
      {children}
    </BoostContext.Provider>
  );
};

export const useBoostContext = () => useContext(BoostContext);
