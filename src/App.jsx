// src/App.jsx 
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import CategoryStrip from "./layout/CategoryStrip";

// Pages
import Home from "./pages/Home";
import Stores from "./pages/Stores";
import PostAd from "./pages/PostAd";
import AdDetails from "./pages/AdDetails";
import AdList from "./pages/AdList";
import CategoryAds from "./pages/CategoryAds";
import Messages from "./pages/Messages";
import Auth from "./pages/Auth";
import Storefront from "./pages/Storefront";
import StoreDashboard from "./pages/StoreDashboard";
import Subscription from "./pages/Subscription";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Notfound from "./pages/Notfound";
import CategoryGrid from "./components/CategoryGrid";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryStrip />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/ads" element={<AdList />} />
          <Route path="/ads/:category" element={<CategoryAds />} />
          <Route path="/categories" element={<CategoryGrid />} />
          <Route path="/ad/:id" element={<AdDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/post-ad"
            element={
              <ProtectedRoute>
                <PostAd />
              </ProtectedRoute>
            }
          />

          <Route
            path="/store/dashboard"
            element={
              <ProtectedRoute>
                <StoreDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/store/:id" element={<Storefront />} />

          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <Subscription />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Auth />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
