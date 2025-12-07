import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useAuthContext as useAuth } from "./AuthContext";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();

  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "admin";

  // Load all admin data
  const fetchAdminData = async () => {
    if (!isAdmin) return;

    setLoading(true);

    const adsSnap = await getDocs(collection(db, "ads"));
    const usersSnap = await getDocs(collection(db, "users"));
    const reportsSnap = await getDocs(collection(db, "reports"));

    setAds(adsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setUsers(usersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setReports(reportsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

    setLoading(false);
  };

  useEffect(() => {
    fetchAdminData();
  }, [isAdmin]);

  // -------------------------
  // Admin Actions
  // -------------------------

  const approveAd = async (adId) => {
    await updateDoc(doc(db, "ads", adId), { status: "approved" });
    fetchAdminData();
  };

  const removeAd = async (adId) => {
    await deleteDoc(doc(db, "ads", adId));
    fetchAdminData();
  };

  const suspendUser = async (uid) => {
    await updateDoc(doc(db, "users", uid), { status: "suspended" });
    fetchAdminData();
  };

  const unsuspendUser = async (uid) => {
    await updateDoc(doc(db, "users", uid), { status: "active" });
    fetchAdminData();
  };

  const deleteReport = async (reportId) => {
    await deleteDoc(doc(db, "reports", reportId));
    fetchAdminData();
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        ads,
        users,
        reports,
        loading,
        approveAd,
        removeAd,
        suspendUser,
        unsuspendUser,
        deleteReport,
        refresh: fetchAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
