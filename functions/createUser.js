import * as functions from "firebase-functions";
import admin from "./utils/admin.js";

export const createUser = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection("users").doc(user.uid).set({
    phone: user.phoneNumber || null,
    createdAt: Date.now(),
  });

  return true;
});
