import * as functions from "firebase-functions";

export const moderateAd = functions.firestore
  .document("ads/{adId}")
  .onCreate(async (snap) => {
    const data = snap.data();
    console.log("Ad created:", data);

    // placeholder moderation logic
    return true;
  });
