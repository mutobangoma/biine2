// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Optional recaptcha setup
const setupRecaptcha = (containerId = "recaptcha-container") => {
  return new RecaptchaVerifier(
    auth,
    containerId,
    {
      size: "invisible", // recommended for OTP
      callback: (response) => {
        console.log("reCAPTCHA solved:", response);
      },
    }
  );
};

export {
  app, analytics,
  auth,
  db,
  storage,
  googleProvider,
  facebookProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setupRecaptcha,
};
