import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import AdUnit from "../components/ads/AdUnit";
import { Helmet } from "react-helmet-async";

export default function AdDetails() {
  const { id } = useParams();

  // Supports future /ad/{id}-{slug}
  const cleanId = id.split("-")[0];

  const [ad, setAd] = useState(null);

  useEffect(() => {
    async function loadAd() {
      const adRef = doc(db, "ads", cleanId);
      const snap = await getDoc(adRef);

      if (snap.exists()) {
        setAd({ id: snap.id, ...snap.data() });
      }
    }

    loadAd();
  }, [cleanId]);

  if (!ad) return <p className="p-6">Loading...</p>;

  /* ================= SEO VALUES ================= */

  const slug =
    ad.slug ||
    ad.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const canonicalUrl = `https://biine.app/ad/${ad.id}-${slug}`;

  const mainImage =
    ad.images?.[0]?.url ||
    ad.imageUrls?.[0] ||
    "https://biine.app/og-default.jpg";

  const priceText = ad.price ? `ZMW ${ad.price}` : "Best Price";

  /* ================================================= */

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          {`${ad.title} for Sale in ${ad.location} | ${priceText} | Biine`}
        </title>

        <meta
          name="description"
          content={`${ad.title} available in ${ad.location}. Price: ${priceText}. Buy and sell locally on Biine Zambia.`}
        />

        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph (WhatsApp / Facebook) */}
        <meta property="og:title" content={ad.title} />
        <meta
          property="og:description"
          content={ad.description?.slice(0, 150)}
        />
        <meta property="og:image" content={mainImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: ad.title,
            image: [mainImage],
            description: ad.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "ZMW",
              price: ad.price,
              availability: "https://schema.org/InStock",
            },
            areaServed: {
              "@type": "Country",
              name: "Zambia",
            },
          })}
        </script>
      </Helmet>
      {/* =============== END SEO =============== */}

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* IMAGE */}
          <div className="bg-gray-100 rounded-2xl p-4">
            <img
              src={mainImage}
              alt={ad.title}
              loading="lazy"
              className="rounded-xl w-full"
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-biine">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{ad.title}</h1>
              <div className="text-2xl font-bold text-primary">
                {priceText}
              </div>
            </div>

            {/* INLINE AD */}
            <div className="my-4">
              <AdUnit
                adSlot="2146914081"
                format="auto"
                style={{ display: "block" }}
              />
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {ad.location} • {ad.posted}
            </div>

            <div className="mt-6 text-gray-800 leading-relaxed">
              {ad.description}
            </div>
          </div>

          {/* BOTTOM AD */}
          <AdUnit
            adSlot="3070765905"
            format="autorelaxed"
            style={{ display: "block", marginTop: "20px" }}
          />
        </div>

        <div className="space-y-4">
          {/* SELLER */}
          <div className="bg-white rounded-2xl p-4 shadow-biine">
            <h4 className="font-semibold mb-2">Seller</h4>
            <p className="text-gray-700">{ad.sellerName}</p>
            {ad.seller?.since && (
              <p className="text-sm text-gray-500">
                Member since {ad.seller.since}
              </p>
            )}
            <p className="mt-2 font-semibold text-primary">
              {ad.sellerPhone}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-biine">
            <h4 className="font-semibold mb-2">Safety Tips</h4>
            <ul className="text-sm text-gray-600 list-disc pl-5">
              <li>Meet in a public place.</li>
              <li>Inspect item before purchase.</li>
              <li>Avoid bank transfers.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
