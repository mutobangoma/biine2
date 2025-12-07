import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>

      <p className="text-gray-700 leading-relaxed">
        Biine.App, operated by Tobs Engineering Services, is committed to protecting your personal information. This policy explains how we collect, use, and store your data.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Personal details you provide when creating an account or posting ads.</li>
        <li>Transaction and communication data on the platform.</li>
        <li>Device and usage information for analytics and improving services.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800">How We Use Your Data</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>To operate and improve Biine.App services.</li>
        <li>To communicate with you regarding your account or ads.</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
      <p className="text-gray-700 leading-relaxed">
        You can request access, correction, or deletion of your personal data in accordance with Zambian data protection regulations. Contact us at <a href="mailto:privacy@biine.app" className="text-green-600 underline">info@biine.app</a>.
      </p>
    </div>
  );
}
