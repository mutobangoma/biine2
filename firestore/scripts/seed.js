// firestore/scripts/seed.js
require("dotenv").config({ path: ".env.local" });

const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!serviceAccount) {
  console.error("Set GOOGLE_APPLICATION_CREDENTIALS to the service account JSON path.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

async function seedCollection(file, collectionName) {
  const data = JSON.parse(fs.readFileSync(file));
  for (const item of data) {
    const id = item.id || undefined;
    if (id) {
      await db.collection(collectionName).doc(id.toString()).set(item);
    } else {
      await db.collection(collectionName).add(item);
    }
  }
  console.log(`Seeded ${collectionName} from ${file}`);
}

(async () => {
  const base = path.join(__dirname, "..", "seed");
  await seedCollection(path.join(base, "categories.json"), "categories");
  await seedCollection(path.join(base, "locations.json"), "locations");
  console.log("Seeding complete.");
  process.exit(0);
})();
