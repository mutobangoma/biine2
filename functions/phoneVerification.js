import * as functions from "firebase-functions";

export const phoneVerification = functions.https.onCall(async (data) => {
  const { phoneNumber } = data;

  console.log("Received phone verification request:", phoneNumber);

  return { success: true };
});
