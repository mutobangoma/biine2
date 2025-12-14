import 'dotenv/config';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Absolute path to your service account JSON
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
  path.resolve('C:/Users/TobsPC/Documents/secrets/biine-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();

async function seedCollection(file, collectionName) {
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
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
  const base = path.join('firestore', 'seed');
  await seedCollection(path.join(base, 'categories.json'), 'categories');
  await seedCollection(path.join(base, 'locations.json'), 'locations');
  console.log('Seeding complete.');
})();
