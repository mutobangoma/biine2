import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PostAdForm from "../components/ads/PostAdForm";
import { useNavigate, useLocation } from "react-router-dom";

export default function PostAd() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingAd, setPendingAd] = useState(null);

  // Load pending ad from localStorage if exists
  useEffect(() => {
    const savedAd = localStorage.getItem("pendingAd");
    if (savedAd) {
      setPendingAd(JSON.parse(savedAd));
      localStorage.removeItem("pendingAd"); // clear once loaded
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">Checking login…</div>
    );
  }

  const handleSaveAd = async (adData) => {
    if (!user) {
      // Save form temporarily and redirect to login
      localStorage.setItem("pendingAd", JSON.stringify(adData));
      alert("Please log in to complete your ad post.");
      navigate("/login", { state: { from: location } });
      return;
    }

    // Otherwise, submit ad (the real submission is handled inside PostAdForm)
    console.log("Submitting ad for user:", user.uid, adData);
  };

  return (
    <PostAdForm
      onSave={handleSaveAd}
      initialData={pendingAd} // pre-fill the form if there was pending ad
    />
  );
}
