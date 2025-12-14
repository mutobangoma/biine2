// src/firebase/storage.js
import { storage } from "./firebaseClient";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFile(path, file) {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}
