// firestore/seed/seedLocations.js
import { readFile } from "fs/promises";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const LOCATIONS_FILE = "./firestore/seed/locations.json";
const GOOGLE_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

// Geocode a single location
async function geocodeLocation(locationName) {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      locationName
    )}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.warn(`Failed to geocode ${locationName}: ${data.status}`);
      return { lat: null, lng: null };
    }
  } catch (err) {
    console.error(`Error geocoding ${locationName}:`, err);
    return { lat: null, lng: null };
  }
}

async function seedLocations() {
  const file = await readFile(LOCATIONS_FILE, "utf-8");
  const locations = JSON.parse(file);

  for (const loc of locations) {
    // Geocode main location and sublocations in parallel
    const sublocationNames = loc.sublocations?.map(
      (sub) => `${sub}, ${loc.name}`
    ) || [];

    const allGeocodeNames = [loc.name, ...sublocationNames];
    const geocodeResults = await Promise.all(
      allGeocodeNames.map((name) => geocodeLocation(name))
    );

    // First result is main location
    const mainCoords = geocodeResults[0];

    // Remaining results are sublocations
    const sublocationsWithCoords = {};
    loc.sublocations?.forEach((sub, index) => {
      sublocationsWithCoords[sub] = geocodeResults[index + 1];
    });

    // Save to Firestore
    await db.collection("locations").doc(loc.id).set({
      name: loc.name,
      coordinates: mainCoords,
      sublocations: sublocationsWithCoords,
      createdAt: new Date(),
    });

    console.log(`Seeded ${loc.name} with main coords:`, mainCoords);
    console.log("Sublocations:", sublocationsWithCoords);
  }

  console.log("Seeding complete!");
}

seedLocations().catch((err) => {
  console.error("Seeding failed:", err);
});
