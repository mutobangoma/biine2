/**
 * Seed Firestore Categories (Gumtree Style)
 * Run: node firestore/seed/seedCategories.js
 */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

// ---------------------------
// FIREBASE ADMIN INITIALIZE
// ---------------------------
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require("../serviceAccount.json")
    ),
  });
}

const db = admin.firestore();

// ---------------------------
// LOAD CATEGORIES JSON
// ---------------------------
const categoriesPath = path.join(__dirname, "categories.json");

if (!fs.existsSync(categoriesPath)) {
  console.error("❌ categories.json not found!");
  process.exit(1);
}

const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

// ---------------------------
// MAIN SEED FUNCTION
// ---------------------------
async function seedCategories() {
  console.log("🚀 Starting category seeding...");

  for (const category of categories) {
    const { id, name, subcategories } = category;

    try {
      await db.collection("categories").doc(id).set(
        {
          name,
          subcategories,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      console.log(`✔ Seeded category: ${name}`);
    } catch (err) {
      console.error(`❌ Failed to seed ${name}:`, err.message);
    }
  }

  console.log("🎉 Categories seeding complete!");
  process.exit(0);
}

// Run the script
seedCategories();
