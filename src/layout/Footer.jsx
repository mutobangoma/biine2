import React from "react";
import { Link } from "react-router-dom";
import AdUnit from "../components/ads/AdUnit"; // add

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">

      {/* Multiplex Ad */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <AdUnit
          adSlot="3070765905"
          format="autorelaxed"
          style={{ display: "block" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Biine.App</h4>
          <p className="text-sm text-gray-600">Buy & sell locally. Easy, fast and safe.</p>
        </div>

        <div>
          <h5 className="font-medium mb-2">Company</h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link to="/about" className="hover:text-green-600 transition">About</Link></li>
            <li><Link to="/help" className="hover:text-green-600 transition">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-2">Legal</h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link to="/terms" className="hover:text-green-600 transition">Terms</Link></li>
            <li><Link to="/privacy" className="hover:text-green-600 transition">Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-2">Contact</h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>Email: <a href="mailto:support@biine.app" className="text-green-600 underline">info@biine.app</a></li>
            <li>Phone: +260 981 325 485</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Biine.App — A product of Tobs Engineering Services
        </div>
      </div>
    </footer>
  );
}
