// src/firebase/firestore/ads.js
import { db } from "../../utils/firebaseClient";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

export const adsCollection = collection(db, "ads");

/**
 * validateAdPayload - ensures payload matches your Firestore rules
 * - required: userId (string), title (string), price (string), category (string), desc (string), images (array)
 */
function validateAdPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Ad payload must be an object.");
  }
  if (!payload.userId || typeof payload.userId !== "string") {
    throw new Error("Ad payload must include userId (string).");
  }
  if (!payload.title || typeof payload.title !== "string") {
    throw new Error("Ad payload must include title (string).");
  }
  if (!payload.price || typeof payload.price !== "string") {
    // Your rules require price to be a string — enforce it here
    throw new Error("Ad payload must include price (string). e.g. '175000' or 'K 175,000'.");
  }
  if (!payload.category || typeof payload.category !== "string") {
    throw new Error("Ad payload must include category (string).");
  }
  if (!payload.desc || typeof payload.desc !== "string") {
    throw new Error("Ad payload must include desc (string).");
  }
  if (!Array.isArray(payload.images)) {
    throw new Error("Ad payload must include images (array).");
  }
  // images array can be empty, but must be an array per your rules
}

/**
 * createAd
 * - adId: string (optional - if not provided a caller should generate one)
 * - data: { userId, title, price (string), category, desc, images: [], storeId?, location?, sublocation?, ...}
 */
export async function createAd(adId, data) {
  validateAdPayload(data);
  if (!adId) throw new Error("createAd: adId is required");

  const payload = {
    userId: data.userId,
    title: data.title,
    price: data.price,
    category: data.category,
    desc: data.desc,
    images: data.images, // array
    storeId: data.storeId || null,
    location: data.location || "",
    sublocation: data.sublocation || "",
    createdAt: serverTimestamp(),
    // include any other indexed/search fields you use
  };

  await setDoc(doc(db, "ads", adId), payload);
  return { id: adId, ...payload };
}

export async function getAd(adId) {
  const snap = await getDoc(doc(db, "ads", adId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getAdsByStore(storeId) {
  const q = query(collection(db, "ads"), where("storeId", "==", storeId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getAllAds() {
  const snap = await getDocs(collection(db, "ads"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
