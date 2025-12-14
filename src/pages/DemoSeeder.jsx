import { createStore } from "../firebase/firestore/stores";
import { createAd } from "../firebase/firestore/ads";
import { v4 as uuid } from "uuid";

async function seedDemoStore() {
  const storeId = "demo-zed-motors"; // fixed ID for consistency

  await createStore(storeId, {
    name: "Zed Motors Ltd",
    description: "Quality used vehicles available in Lusaka.",
    location: "Lusaka",
    sublocation: "Kabulonga",
    logoUrl: "https://placehold.co/200x200",
    bannerUrl: "https://placehold.co/1200x300",
    ownerId: "admin-demo",
  });

  const ads = [
    {
      title: "Toyota Axio 2013",
      price: 175000,
      category: "Cars",
      subcategory: "Saloon Cars",
      location: "Lusaka",
      sublocation: "Kabulonga",
      imageUrls: ["https://placehold.co/600x400"],
      storeId,
    },
    {
      title: "Toyota Vitz 2010",
      price: 115000,
      category: "Cars",
      subcategory: "Hatchbacks",
      location: "Lusaka",
      sublocation: "Kabulonga",
      imageUrls: ["https://placehold.co/600x400"],
      storeId,
    },
  ];

  for (const ad of ads) {
    await createAd(uuid(), ad);
  }

  console.log("Demo store + ads created.");
}

seedDemoStore();
