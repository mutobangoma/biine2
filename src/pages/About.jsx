import React from "react";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">About Biine.App</h1>

      <p className="text-gray-700 leading-relaxed">
        Biine.App is Zambia's fast, safe, and easy online marketplace for buying and selling cars, property, electronics, furniture, and more. Our mission is to connect buyers and sellers locally, making transactions simple and reliable.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">Our Company</h2>
      <p className="text-gray-700 leading-relaxed">
        Biine.App is a product of <strong>Tobs Engineering Services</strong>, a Zambian registered business under PACRA. We are also registered with the <strong>Office of the Data Protection Commissioner</strong> to ensure compliance with Zambia's data privacy laws.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li><strong>Trust:</strong> Providing a secure platform for local buyers and sellers.</li>
        <li><strong>Transparency:</strong> Clear ad policies and pricing.</li>
        <li><strong>Innovation:</strong> Constantly improving features for a better marketplace experience.</li>
        <li><strong>Community:</strong> Supporting local businesses and users.</li>
      </ul>
    </div>
  );
}
