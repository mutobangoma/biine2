import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Home,
  Briefcase,
  Smartphone,
  Shirt,
  PawPrint,
  Hammer,
  Sofa,
  GraduationCap,
  HeartPulse,
  MoreHorizontal,
} from "lucide-react";

const categories = [
  { name: "Cars", slug: "cars", icon: Car },
  { name: "Property", slug: "property", icon: Home },
  { name: "Jobs", slug: "jobs", icon: Briefcase },
  { name: "Electronics", slug: "electronics", icon: Smartphone },
  { name: "Fashion", slug: "fashion", icon: Shirt },
  { name: "Animals", slug: "animals", icon: PawPrint },
  { name: "Services", slug: "services", icon: Hammer },
  { name: "Furniture", slug: "furniture", icon: Sofa },
  { name: "Education", slug: "education", icon: GraduationCap },
  { name: "Health", slug: "health", icon: HeartPulse },
  { name: "Other", slug: "other", icon: MoreHorizontal },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="flex flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <Icon className="w-7 h-7 mb-2 text-gray-700" />
              <span className="text-sm font-medium text-gray-800 text-center">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
