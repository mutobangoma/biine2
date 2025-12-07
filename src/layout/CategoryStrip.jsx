import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Home,
  Briefcase,
  Smartphone,
  Shirt,
  PawPrint
} from "lucide-react";

const categories = [
  { name: "Vehicles", slug: "vehicles", icon: Car },
  { name: "Property", slug: "property", icon: Home },
  { name: "Jobs", slug: "jobs", icon: Briefcase },
  { name: "Electronics", slug: "electronics", icon: Smartphone },
  { name: "Fashion", slug: "fashion", icon: Shirt },
  { name: "Pets", slug: "pets", icon: PawPrint }
];

export default function CategoryStrip() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto flex md:justify-between gap-6 overflow-x-auto px-4 py-3">

        {categories.map(({ name, slug, icon: Icon }) => (
        <Link
          key={slug}
          to={`/ads/${slug}`}
          className="flex flex-col items-center text-sm text-gray-700 hover:text-primary"
        >
          <Icon className="w-6 h-6 mb-1" />
          {name}
        </Link>
      ))}
      </div>
    </div>
  );
}
