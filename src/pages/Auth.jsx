// src/pages/Auth.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  auth,
  googleProvider,
  facebookProvider,
  setupRecaptcha,
} from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  signInWithPhoneNumber,
} from "firebase/auth";

import AuthButtons from "../components/AuthButtons";
import CountryCodeDropdown from "../components/CountryCodeDropdown";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "email"; // default view

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [countryCode, setCountryCode] = useState("+260");
  const [localPhone, setLocalPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Init recaptcha once
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      try {
        setupRecaptcha("recaptcha-container");
      } catch (err) {
        console.warn("reCAPTCHA not initialized:", err.message);
      }
    }
  }, []);

  // Email register
  async function handleRegister(e) {
    e?.preventDefault?.();
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(res.user);
      alert("Verification email sent!");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Email login
  async function handleLogin(e) {
    e?.preventDefault?.();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // OAuth Google
  async function handleGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  // Facebook
  async function handleFacebook() {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  // Phone: send OTP
  async function sendOtp(e) {
    e?.preventDefault?.();
    const sanitized = localPhone.replace(/\D/g, "").replace(/^0+/, "");
    if (sanitized.length < 6) return alert("Enter a valid phone number.");

    const fullNumber = `${countryCode}${sanitized}`;
    setLoading(true);
    try {
      if (!window.recaptchaVerifier) setupRecaptcha("recaptcha-container");
      const verifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, fullNumber, verifier);
      setConfirmationResult(result);
      alert("OTP sent to " + fullNumber);
    } catch (err) {
      alert("Failed to send OTP: " + err.message);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  }

  // Confirm OTP
  async function confirmOtp(e) {
    e?.preventDefault?.();
    if (!confirmationResult) return alert("Request OTP first");
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      navigate("/");
    } catch (err) {
      alert("Invalid OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function doSignOut() {
    await signOut(auth);
    alert("Signed out");
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow my-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Sign In / Register</h2>
        <AuthButtons onGoogle={handleGoogle} />
      </div>

      {/* Toggle area */}
      <div className="space-y-4">
        {/* Email panel */}
        {(mode === "email") && (
          <form onSubmit={handleLogin} className="space-y-3">
            <input className="input w-full" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className="input w-full" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>Login</button>
              <button type="button" className="btn btn-outline" onClick={handleRegister} disabled={loading}>Register</button>
            </div>
          </form>
        )}

        {/* Phone panel */}
        {(mode === "phone") && (
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <div className="flex gap-2 mt-2">
              <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
              <input className="input flex-1" placeholder="97xxxxxxx" value={localPhone} onChange={(e)=>setLocalPhone(e.target.value)} />
            </div>

            <button onClick={sendOtp} className="btn btn-primary w-full mt-3" disabled={loading}>Send OTP</button>

            {confirmationResult && (
              <form onSubmit={confirmOtp} className="mt-4 space-y-2">
                <input className="input w-full" placeholder="Enter OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} />
                <button className="btn btn-primary w-full" type="submit">Confirm OTP</button>
              </form>
            )}
          </div>
        )}

        {/* OAuth panel (if mode=google or default show buttons) */}
        {(mode === "google") && (
          <div className="space-y-2">
            <button onClick={handleGoogle} className="w-full p-2 border rounded">Continue with Google</button>
            <button onClick={handleFacebook} className="w-full p-2 border rounded">Continue with Facebook</button>
          </div>
        )}
      </div>

      <div id="recaptcha-container"></div>

      <hr className="my-4" />

      <button onClick={doSignOut} className="btn btn-outline w-full">Sign Out</button>
    </div>
  );
}
