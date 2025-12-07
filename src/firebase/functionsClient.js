// src/firebase/functionsClient.js
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase/firebaseConfig"; // or ./firebase/config

const functions = getFunctions(app);

// call a callable function by name
export async function callFunction(name, data = {}) {
  const fn = httpsCallable(functions, name);
  const res = await fn(data);
  return res.data;
}

// convenience wrapper to call an https endpoint (if you deployed HTTP functions)
export async function callHttpFunction(url, body = {}) {
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) throw new Error(`Function error: ${resp.status}`);
  return resp.json();
}
