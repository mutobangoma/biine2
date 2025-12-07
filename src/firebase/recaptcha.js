// src/firebase/recaptcha.js
import { auth } from "../firebase/firebaseConfig"; // or your config import
import { RecaptchaVerifier } from "firebase/auth";

/**
 * createRecaptcha(containerId, size)
 * - containerId: the DOM id where recaptcha should render
 * - returns RecaptchaVerifier instance
 */
export async function createRecaptcha(containerId = "recaptcha-container", size = "invisible") {
  // If already created on window, return it
  if (typeof window !== "undefined" && window.recaptchaVerifier) {
    return window.recaptchaVerifier;
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size,
    callback: (token) => {
      // token resolved
      console.debug("recaptcha token", token);
    },
  });

  // render ensures widget is created; return verifier
  await verifier.render();
  if (typeof window !== "undefined") window.recaptchaVerifier = verifier;
  return verifier;
}
