import React from "react";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import ListingCard from "../components/ListingCard";

export default function Home() {
  return (
    <div className="space-y-12">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-lime-500 text-white h-32 flex items-center">

  <div className="max-w-4xl mx-auto px-6 text-center">
    <h1 className="text-3xl md:text-4xl font-extrabold leading-snug mb-3">
      Buy & Sell in Zambia — Fast, Safe & Easy
    </h1>
    <p className="text-base opacity-90">
      Find cars, phones, property and more near you.
    </p>
  </div>
</section>


      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          <CategoryCard title="Cars" image="/img/cars.jpg" />
          <CategoryCard title="Property" image="/img/property.jpg" />
          <CategoryCard title="Phones" image="/img/phones.jpg" />
          <CategoryCard title="Jobs" image="/img/jobs.jpg" />
          <CategoryCard title="Furniture" image="/img/furniture.jpg" />
          <CategoryCard title="Pets" image="/img/pets.jpg" />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Featured Listings
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
      </section>

    </div>
  );
}
