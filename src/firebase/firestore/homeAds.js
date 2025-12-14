import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getRecentAds(max = 50) {
  const q = query(
    collection(db, "ads"),
    orderBy("createdAt", "desc"),
    limit(max)
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
