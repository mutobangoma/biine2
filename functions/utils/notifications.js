import admin from "./admin.js";

export async function sendNotification(token, title, body) {
  const message = {
    notification: { title, body },
    token,
  };

  try {
    await admin.messaging().send(message);
    console.log("Notification sent");
  } catch (err) {
    console.error("Notification error:", err);
  }
}
