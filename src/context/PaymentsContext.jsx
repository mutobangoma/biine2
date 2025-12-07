import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuthContext as useAuth } from "./AuthContext";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const PaymentsContext = createContext();

export const PaymentsProvider = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch transactions for current user
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTransactions(list);
    });

    return () => unsub();
  }, [user]);

  // ------------------------------
  //  Create a payment intent (Generic)
  // ------------------------------
  const createPayment = async ({ amount, method, description }) => {
    if (!user) throw new Error("Must be logged in");

    setLoading(true);

    // Placeholder — this is where Visa/Flutterwave/Paystack API integration goes.
    const paymentRef = await addDoc(collection(db, "transactions"), {
      userId: user.uid,
      amount,
      method,
      description,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    setLoading(false);

    return paymentRef.id;
  };

  // ------------------------------
  //  Update payment after verification
  // ------------------------------
  const confirmPayment = async (paymentId, status = "success") => {
    return await addDoc(collection(db, "paymentUpdates"), {
      paymentId,
      status,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <PaymentsContext.Provider
      value={{
        transactions,
        loading,
        createPayment,
        confirmPayment,
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePaymentsContext = () => useContext(PaymentsContext);
