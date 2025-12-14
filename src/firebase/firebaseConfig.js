// src/firebase/firebaseConfig.js
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

import {
  initializeAppCheck,
  ReCaptchaV3Provider
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  clientId: "170873146813-u8p10bpk8euu2nh5hjl3420biso93fq0.apps.googleusercontent.com",

};
export default firebaseConfig;
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize App Check (IMPORTANT)
if (typeof window !== "undefined") {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Firebase Auth Recaptcha (used for OTP only)
const setupRecaptcha = (containerId = "recaptcha-container") => {
  return new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: (response) => {
      console.log("reCAPTCHA solved:", response);
    },
  });
};

export {
  app,
  analytics,
  auth,
  db,
  storage,
  googleProvider,
  facebookProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  setupRecaptcha,
};
