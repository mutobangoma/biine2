import { db } from "../firebaseClient";
import { doc, collection, setDoc, getDocs, serverTimestamp } from "firebase/firestore";

const storesCollection = collection(db, "stores");

export async function createStore(storeId, data) {
  const payload = {
    name: data.name || "",
    description: data.description || "",
    location: data.location || "",
    sublocation: data.sublocation || "",
    logoUrl: data.logoUrl || "",
    bannerUrl: data.bannerUrl || "",
    ownerId: data.ownerId,
    verified: !!data.verified,
    createdAt: serverTimestamp(),
    subscription: data.subscription || {},
  };

  await setDoc(doc(db, "stores", storeId), payload);
  return { id: storeId, ...payload };
}

export async function getAllStores() {
  const snap = await getDocs(storesCollection);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
