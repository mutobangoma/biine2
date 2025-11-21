// src/pages/AdDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import SellerBox from "../components/SellerBox";

export default function AdDetails() {
  const { id } = useParams();

  // TODO: fetch real ad by id from Firestore
  const ad = {
    id,
    title: "2015 Toyota Corolla - Good Condition",
    price: "ZMW 45,000",
    images: [{ url: "/img/placeholder.jpg" }, { url: "/img/placeholder-2.jpg" }],
    description: "Well maintained, single owner, full service history.",
    location: "Lusaka",
    posted: "3 days ago",
    seller: { name: "John Doe", since: "Member since 2021", phone: "+260978000001" },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <ImageGallery images={ad.images} />
        <div className="bg-white rounded-2xl p-6 shadow-biine">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{ad.title}</h1>
            <div className="text-2xl font-bold text-primary">{ad.price}</div>
          </div>

          <div className="mt-4 text-sm text-gray-600">{ad.location} • {ad.posted}</div>

          <div className="mt-6 text-gray-800 leading-relaxed">{ad.description}</div>
        </div>
      </div>

      <div className="space-y-4">
        <SellerBox seller={ad.seller} />
        <div className="bg-white rounded-2xl p-4 shadow-biine">
          <h4 className="font-semibold mb-2">Safety Tips</h4>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li>Meet in a public place.</li>
            <li>Inspect item before purchase.</li>
            <li>Avoid bank transfers to unknown persons.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
