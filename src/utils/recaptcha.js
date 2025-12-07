// src/utils/recaptcha.js
export async function getRecaptchaToken(action = "phone_signin") {
  if (!window.grecaptcha) throw new Error("reCAPTCHA not loaded");

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY, { action })
        .then((token) => resolve(token))
        .catch((err) => reject(err));
    });
  });
}
