// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import CategoryStrip from "./layout/CategoryStrip";

import Home from "./pages/Home";
import AdList from "./pages/AdList";
import AdDetails from "./pages/AdDetails";
import PostAd from "./pages/PostAd";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Inbox from "./pages/Inbox";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryStrip />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ads" element={<AdList />} />
          <Route path="/ads/:category" element={<AdList />} />
          <Route path="/ad/:id" element={<AdDetails />} />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <PostAd />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/chat/:chatId" element={<Chat />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
