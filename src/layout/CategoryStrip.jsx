import React from "react";
import { Link } from "react-router-dom";
import { Car, Home, Briefcase, Smartphone, Shirt, PawPrint } from "lucide-react";

const categories = [
  { name: "Cars", icon: Car },
  { name: "Property", icon: Home },
  { name: "Jobs", icon: Briefcase },
  { name: "Electronics", icon: Smartphone },
  { name: "Fashion", icon: Shirt },
  { name: "Pets", icon: PawPrint },
];

export default function CategoryStrip() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto flex md:justify-between gap-6 overflow-x-auto px-4 py-3">

        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/ads/${cat.name.toLowerCase()}`}
            className="flex items-center gap-2 text-gray-700 hover:text-primary whitespace-nowrap"
          >
            <cat.icon className="h-5 w-5" />
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
