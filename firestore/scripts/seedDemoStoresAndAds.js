import admin from "firebase-admin";

/* -------------------- INIT -------------------- */
admin.initializeApp({
  projectId: "biine2", // force new project
});

const db = admin.firestore();

/* -------------------- CONFIG -------------------- */

// This UID MUST exist in /users
const DEMO_USER_ID = "apKVaF1yTrgh6ZWCIj1gvBLueyf1";

/* -------------------- STORES -------------------- */
const STORES = [
  ["zed-motors", "Zed Motors Ltd", "Quality used vehicles", "Lusaka", "Kabulonga"],
  ["home-furnish", "Lusaka Home Furnishings", "Furniture & décor", "Lusaka", "Woodlands"],
  ["electronics-hub", "Copperbelt Electronics Hub", "Phones & laptops", "Ndola", "CBD"],
  ["jobconnect", "Zambia JobConnect", "Recruitment agency", "Lusaka", "CBD"],
  ["zedfashion", "ZedFashion Warehouse", "Clothes & shoes", "Kitwe", "Parklands"],
  ["petcare", "PetCare Zambia", "Pets & pet supplies", "Lusaka", "Chelstone"],
  ["chilanga-property", "Chilanga Property Group", "Property rentals", "Lusaka", "Chilanga"],
  ["smartfix", "SmartFix Repairs", "Phone & laptop repairs", "Lusaka", "Kamwala"],
  ["kitchenpro", "KitchenPro Zambia", "Kitchen appliances", "Livingstone", "Dambwa"],
  ["kidszone", "KidsZone Store", "Kids clothes & toys", "Lusaka", "Chawama"],
];

/* -------------------- ADS -------------------- */
const AD_CATEGORIES = {
  Cars: ["Toyota Axio", "Toyota Vitz", "Mazda Demio"],
  Property: ["2 Bedroom House", "3 Bedroom Flat", "Office Space"],
  Electronics: ["iPhone 11", "Samsung A32", "HP Laptop"],
  Jobs: ["Office Assistant", "Sales Rep", "Driver Needed"],
  Fashion: ["Sneakers", "Handbags", "Jackets"],
};

/* -------------------- HELPERS -------------------- */
async function docExists(ref) {
  const snap = await ref.get();
  return snap.exists;
}

/* -------------------- MAIN -------------------- */
async function seed() {
  if (!DEMO_USER_ID) {
    throw new Error("❌ DEMO_USER_ID is required.");
  }

  console.log("🚀 Seeding demo stores...");

  for (const [slug, name, desc, location, sublocation] of STORES) {
    const ref = db.collection("stores").doc(slug);

    if (await docExists(ref)) {
      console.log(`↪ Store exists: ${name}`);
      continue;
    }

    await ref.set({
      name,
      description: desc,
      location,
      sublocation,
      ownerId: DEMO_USER_ID,
      verified: true,
      isDemo: true,
      logoUrl: "https://placehold.co/200x200",
      bannerUrl: "https://placehold.co/1200x300",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ Created store: ${name}`);
  }

  console.log("🚀 Seeding demo ads...");
  let adCount = 0;

  for (const [storeId] of STORES) {
    for (let i = 0; i < 10; i++) {
      if (adCount >= 100) break;

      const categories = Object.keys(AD_CATEGORIES);
      const category = categories[adCount % categories.length];
      const title =
        AD_CATEGORIES[category][i % AD_CATEGORIES[category].length];

      const adRef = db.collection("ads").doc(`demo-${storeId}-${i}`);

      if (await docExists(adRef)) {
        adCount++;
        continue;
      }

      await adRef.set({
        userId: DEMO_USER_ID,          // rules-required
        title,
        price: (500 + i * 150).toString(), // STRING
        category,
        desc: `Quality ${title.toLowerCase()} available now.`,
        isDemo: true,                 // ⭐ OPTION 2 FLAG
        storeId,
        location: "Zambia",
        sublocation: "",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      adCount++;
    }
  }

  console.log(`✅ Seeding complete: ${adCount} demo ads created`);
}

/* -------------------- RUN -------------------- */
seed()
  .then(() => {
    console.log("🎉 Demo data seeded successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
