// src/components/AuthButtons.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Chrome, Mail, Phone } from "lucide-react";

export default function AuthButtons({ onGoogle, onEmail, onPhone }) {
  const navigate = useNavigate();

  const openAuth = (mode) => navigate(`/auth?mode=${mode}`);

  return (
    <div className="flex items-center gap-3">
      
      {/* Google */}
      <button
        aria-label="Sign in with Google"
        onClick={() => onGoogle ? onGoogle() : openAuth("google")}
        className="p-2 rounded-full bg-white border shadow-sm hover:shadow-md"
      >
        <Chrome className="w-5 h-5 text-gray-700" />
      </button>

      {/* Email */}
      <button
        aria-label="Sign in with Email"
        onClick={() => onEmail ? onEmail() : openAuth("email")}
        className="p-2 rounded-full bg-white border shadow-sm hover:shadow-md"
      >
        <Mail className="w-5 h-5 text-gray-700" />
      </button>

      {/* Phone */}
      <button
        aria-label="Sign in with Phone"
        onClick={() => onPhone ? onPhone() : openAuth("phone")}
        className="p-2 rounded-full bg-white border shadow-sm hover:shadow-md"
      >
        <Phone className="w-5 h-5 text-gray-700" />
      </button>

    </div>
  );
}
