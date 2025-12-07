import React from "react";

export default function Terms() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>

      <p className="text-gray-700 leading-relaxed">
        Welcome to Biine.App. By accessing or using our platform, you agree to comply with our terms of service. These terms govern your use of our website and services.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">User Responsibilities</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Ensure that all information provided in ads is accurate and honest.</li>
        <li>Respect other users and avoid abusive or fraudulent behavior.</li>
        <li>Comply with all applicable laws in Zambia when using Biine.App.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800">Platform Usage</h2>
      <p className="text-gray-700 leading-relaxed">
        Biine.App reserves the right to remove ads, suspend accounts, or limit access to services if users violate these terms or engage in prohibited behavior.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">Limitation of Liability</h2>
      <p className="text-gray-700 leading-relaxed">
        Biine.App is a marketplace platform and does not guarantee the quality or safety of listed products. Users engage in transactions at their own risk.
      </p>
    </div>
  );
}
