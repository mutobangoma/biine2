import React from "react";

export default function HelpCenter() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Help Center</h1>

      <p className="text-gray-700 leading-relaxed">
        Welcome to the Biine.App Help Center. Here you'll find answers to the most common questions about posting ads, browsing listings, and managing your account.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">Popular Topics</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li><strong>Posting an Ad:</strong> Step-by-step instructions to post your item.</li>
        <li><strong>Account Management:</strong> How to update your profile, password, and contact details.</li>
        <li><strong>Safety Tips:</strong> Best practices for buying and selling safely online.</li>
        <li><strong>Payments:</strong> Understanding our payment methods and transaction process.</li>
      </ul>

      <p className="text-gray-700 leading-relaxed">
        For further assistance, please contact our support team at <a href="mailto:info@biine.app" className="text-green-600 underline">info@biine.app</a>.
      </p>
    </div>
  );
}
