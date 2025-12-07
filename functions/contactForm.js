import * as functions from "firebase-functions";
import admin from "./utils/admin.js";

export const contactForm = functions.https.onCall(async (data) => {
  const { name, email, message } = data;

  await admin.firestore().collection("contactMessages").add({
    name,
    email,
    message,
    createdAt: Date.now(),
  });

  return { success: true };
});
