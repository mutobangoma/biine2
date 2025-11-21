import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";
import { createRecaptchaVerifier } from "../utils/createRecaptcha";

export default function SendOtpButton({ phone, onOtpSent }) {
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.length < 6) {
      alert("Enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      // Create verifier (renders CAPTCHA)
      const verifier = await createRecaptchaVerifier("recaptcha-container");

      // Send OTP
      const result = await signInWithPhoneNumber(auth, phone, verifier);

      window.confirmationResult = result; // store globally
      onOtpSent(true);

      console.log("OTP sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    }

    setLoading(false);
  };

  return (
    <button
      disabled={loading}
      onClick={handleSendOtp}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? "Sending..." : "Send OTP"}
    </button>
  );
}
