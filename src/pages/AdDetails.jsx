import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import AdUnit from "../components/ads/AdUnit";

export default function AdDetails() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    async function loadAd() {
      const adRef = doc(db, "ads", id);
      const snap = await getDoc(adRef);

      if (snap.exists()) {
        setAd({ id: snap.id, ...snap.data() });
      }
    }

    loadAd();
  }, [id]);

  if (!ad) return <p className="p-6">Loading...</p>;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div className="lg:col-span-2 space-y-4">

        {/* TEMPORARY IMAGE HOLDER */}
        <div className="bg-gray-100 rounded-2xl p-4">
          <img
            src={ad.images[3].url}
            alt="Ad"
            className="rounded-xl w-full"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-biine">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{ad.title}</h1>
            <div className="text-2xl font-bold text-primary">{ad.price}</div>
          </div>

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

        <AdUnit
          adSlot="3070765905"
          format="autorelaxed"
          style={{ display: "block", marginTop: "20px" }}
        />

      </div>

      <div className="space-y-4">

        {/* TEMPORARY SELLER BOX */}
        <div className="bg-white rounded-2xl p-4 shadow-biine">
          <h4 className="font-semibold mb-2">Seller</h4>
          <p className="text-gray-700">{ad.sellerName}</p>
          <p className="text-sm text-gray-500">Member since {ad.seller.since}</p>
          <p className="mt-2 font-semibold text-primary">{ad.sellerPhone}</p>
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
  );
}
