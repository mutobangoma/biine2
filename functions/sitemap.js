const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.sitemap = functions.https.onRequest(async (req, res) => {
  res.set("Content-Type", "application/xml");

  const adsSnap = await db
    .collection("ads")
    .where("status", "==", "approved")
    .limit(5000)
    .get();

  const adUrls = adsSnap.docs
    .map(doc => {
      const ad = doc.data();
      const slug = ad.slug || ad.title?.toLowerCase().replace(/\s+/g, "-");

      return `
        <url>
          <loc>https://biine.app/ad/${doc.id}-${slug}</loc>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
        </url>
      `;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://biine.app/</loc>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://biine.app/categories</loc>
      <priority>0.8</priority>
    </url>
    ${adUrls}
  </urlset>`;

  res.status(200).send(xml);
});
