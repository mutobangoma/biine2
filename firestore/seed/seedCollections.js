// firestore/seed/seedCategories.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import categories from "./categories.json" assert { type: "json" };
import firebaseConfig from "../firebase/firebaseConfig.js"; // make sure path is correct

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedCategories() {
  for (const cat of categories) {
    const catRef = doc(db, "categories", cat.id);
    await setDoc(catRef, { name: cat.name, subcategories: cat.subcategories });
    console.log(`Seeded category: ${cat.name}`);
  }
  console.log("All categories seeded!");
}

seedCategories().catch(console.error);
