// src/utils/verifyToken.js
export async function verifyToken(token) {
  // Replace with your Firebase function URL if deployed
  const url = "/verifyRecaptchaToken";

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await resp.json();
  if (!data.success) throw new Error("reCAPTCHA verification failed");
  return data;
}