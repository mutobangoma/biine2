import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import locations from "../seed/locations.json" assert { type: "json" };

// Load your existing service account JSON
const serviceAccount = JSON.parse(
  fs.readFileSync("C:/Users/TobsPC/Documents/secrets/biine-service-account.json")
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seed() {
  for (const loc of locations) {
    await db.collection("locations").doc(loc.id).set({
      name: loc.name,
      lat: loc.lat,
      lng: loc.lng,
      sublocations: loc.sublocations,
    });
    console.log("Seeded:", loc.name);
  }
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
