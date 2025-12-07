import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup
} from "firebase/auth";
import { googleProvider } from "../firebaseConfig";
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });

    return () => unsub();
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  return {
    user,
    authLoading,
    loginWithGoogle,
    logout: () => signOut(auth)
  };
};
