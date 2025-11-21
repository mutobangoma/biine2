import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebaseConfig";

let recaptcha;

export const createRecaptchaVerifier = (containerId) => {
  if (!recaptcha) {
    recaptcha = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA solved:", response);
      }
    });
  }
  return recaptcha;
};
