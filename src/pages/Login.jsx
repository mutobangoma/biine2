// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OtpInput from "../components/OtpInput";

import {
  auth,
  googleProvider,
  signInWithPhoneNumber as fw_signInWithPhoneNumber,
  setupRecaptcha,
} from "../firebaseConfig";

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

/* ------------- Country codes ------------- */
const COUNTRY_OPTIONS = [
  { code: "+260", label: "Zambia", flag: "🇿🇲" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+256", label: "Uganda", flag: "🇺🇬" },
  { code: "+255", label: "Tanzania", flag: "🇹🇿" },
  { code: "+254", label: "Kenya", flag: "🇰🇪" },
  { code: "+1", label: "USA", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
];

/* Validators */
const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
const isValidPhone = (v) => /^[0-9]{6,15}$/.test(v.replace(/\s+/g, ""));

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showPhoneForm, setShowPhoneForm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [countryCode, setCountryCode] = useState("+260");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  /* Redirect if logged in */
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  /* Dynamic import for phone sign-in */
  async function getSignInWithPhoneNumber() {
    if (typeof fw_signInWithPhoneNumber === "function")
      return fw_signInWithPhoneNumber;
    const mod = await import("firebase/auth");
    return mod.signInWithPhoneNumber;
  }

  /* reCAPTCHA setup */
  async function createRecaptchaVerifier(id = "recaptcha-container") {
    let verifier;

    if (typeof setupRecaptcha === "function") {
      try {
        verifier = setupRecaptcha(id);
      } catch {}
    }

    if (!verifier) {
      const mod = await import("firebase/auth");
      const { RecaptchaVerifier } = mod;
      verifier = new RecaptchaVerifier(auth, id, { size: "invisible" });
    }

    await verifier.render();
    return verifier;
  }

  /* Email Authentication */
  const handleEmailAuth = async () => {
    setErrMsg("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };

  /* Google Login */
  const handleGoogleLogin = async () => {
    setErrMsg("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };

  /* Phone OTP */
  const sendOTP = async () => {
    setErrMsg("");
    setLoading(true);

    try {
      const fullPhone = `${countryCode}${phone.replace(/^0+/, "")}`;
      const signInPhone = await getSignInWithPhoneNumber();
      const verifier = await createRecaptchaVerifier("recaptcha-container");

      window.recaptchaVerifier = verifier;
      window.confirmationResult = await signInPhone(auth, fullPhone, verifier);

      setOtpSent(true);
    } catch (err) {
      setErrMsg(err.message);
    }
    setLoading(false);
  };

  /* OTP Verification */
  const verifyOtp = async () => {
    try {
      await window.confirmationResult.confirm(otp);
    } catch {
      alert("Invalid OTP code");
    }
  };

  /* UI */
  return (
    <div className="min-h-screen flex items-center justify-center bg-graybg p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-biine p-6">
        <h2 className="text-2xl text-center font-semibold mb-4">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>

        {errMsg && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded mb-3">
            {errMsg}
          </div>
        )}

        {/* Email Form */}
        {showEmailForm && (
          <div className="space-y-3">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleEmailAuth}
              disabled={!isValidEmail(email) || password.length < 6}
              className="btn btn-primary w-full"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </button>
          </div>
        )}

        {/* Switch Login/Register */}
        <div className="flex justify-between mt-3 text-sm">
          <button onClick={() => setIsLogin((s) => !s)} className="underline">
            {isLogin ? "Create an account" : "Already have an account?"}
          </button>

          <button
            className="text-primary underline"
            onClick={() => {
              setShowEmailForm((s) => !s);
              setShowPhoneForm(false);
            }}
          >
            Toggle Email
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social + Phone Icons */}
        <div className="flex justify-center gap-4">
          {/* Email Icon */}
          <button
            className="icon-btn"
            onClick={() => {
              setShowEmailForm(true);
              setShowPhoneForm(false);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="2" />
              <rect
                x="3"
                y="6"
                width="18"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Google */}
          <button onClick={handleGoogleLogin} className="icon-btn bg-white shadow-sm">
            <svg width="20" height="20" viewBox="0 0 488 512">
              <path
                fill="#EA4335"
                d="M448 224h-192v64h112c-8 48-56 96-112 96s-120-56-120-128 56-128 120-128c32 0 64 16 80 32l48-48C352 80 304 64 248 64 136 64 48 152 48 264s88 200 200 200c104 0 192-80 192-192 0-16 0-32-8-48z"
              />
            </svg>
          </button>

          {/* Phone */}
          <button
            className="icon-btn"
            onClick={() => {
              setShowPhoneForm(true);
              setShowEmailForm(false);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.12.83.33 1.64.62 2.42a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006 6l1.66-1.09a2 2 0 012.11-.45c.78.29 1.59.5 2.42.62A2 2 0 0122 16.92z"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        {/* Phone Form */}
        {showPhoneForm && (
          <div className="mt-4 space-y-4">

            {/* Before OTP is sent */}
            {!otpSent && (
              <>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="border rounded-xl p-2 w-28"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    className="input flex-1"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  onClick={sendOTP}
                  disabled={!isValidPhone(phone)}
                  className="btn bg-accent text-white w-full"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {/* After OTP sent */}
            {otpSent && (
              <>
                <OtpInput value={otp} onChange={setOtp} length={6} />

                <button
                  onClick={verifyOtp}
                  className="btn bg-green-600 text-white w-full"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  onClick={() => {
                    setOtp("");
                    setOtpSent(false);
                  }}
                  className="text-sm underline text-gray-600 text-center w-full"
                >
                  Resend OTP
                </button>
              </>
            )}
          </div>
        )}

        <div id="recaptcha-container" style={{ minHeight: "1px" }}></div>
      </div>
    </div>
  );
}
