import * as functions from "firebase-functions";
import { sendNotification } from "./utils/notifications.js";

export const pushPersonalNotification = functions.https.onCall(
  async (data) => {
    const { token, title, body } = data;
    await sendNotification(token, title, body);
    return { success: true };
  }
);
