// src/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Biine.App</h4>
          <p className="text-sm text-gray-600">Buy & sell locally. Easy, fast and safe.</p>
        </div>

        <div>
          <h5 className="font-medium mb-2">Company</h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-2">Help</h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link to="/">Help Center</Link></li>
            <li><Link to="/">Safety Tips</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-2">Legal</h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link to="/">Terms</Link></li>
            <li><Link to="/">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">© {new Date().getFullYear()} Biine.App</div>
      </div>
    </footer>
  );
}
