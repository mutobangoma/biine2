// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AdUnit from "../components/ads/AdUnit";
import StoreCard from "../components/store/StoreCard";
import ListingCard from "../components/ListingCard";

import { getAllStores } from "../firebase/firestore/stores";
import { getRecentAds } from "../firebase/firestore/homeAds";
import { getCachedRandomItems } from "../utils/randomCache";

export default function Home() {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const allStores = await getAllStores();
        const recentAds = await getRecentAds(50);

        setStores(
          getCachedRandomItems("home_random_stores", allStores, 6)
        );

        setAds(
          getCachedRandomItems("home_random_ads", recentAds, 8)
        );
      } catch (err) {
        console.error("Home load error", err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-lime-500 py-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Buy & Sell in Zambia</h1>
        <p className="text-gray-600 mt-2">
          Simple classifieds for your local area.
        </p>

        <div className="mt-6 max-w-xl mx-auto">
          <SearchBar
            onSubmit={(v) =>
              navigate(`/ads?search=${encodeURIComponent(v)}`)
            }
          />
        </div>
      </section>

      {/* Hero Ad */}
      <div className="max-w-7xl mx-auto px-6">
        <AdUnit
          adSlot="2146914081"
          format="auto"
          style={{ display: "block", margin: "20px auto" }}
        />
      </div>

      {/* Random Stores */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Featured Stores</h2>
          <Link to="/stores" className="text-sm text-green-600">
            View all
          </Link>
        </div>

        {loading ? (
          <p>Loading stores…</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {stores.map((store) => (
              <Link key={store.id} to={`/store/${store.id}`}>
                <StoreCard store={store} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Inline Ad */}
      <div className="mt-10">
        <AdUnit
          adSlot="3785081773"
          format="fluid"
          layoutKey="-gw-3+1f-3d+2z"
          style={{ display: "block" }}
        />
      </div>

      {/* Random User Ads */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Latest from Individuals</h2>
          <Link to="/ads" className="text-sm text-green-600">
            Browse all
          </Link>
        </div>

        {loading ? (
          <p>Loading ads…</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ads.map((ad) => (
              <ListingCard key={ad.id} ad={ad} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom Ad */}
      <div className="mt-12">
        <AdUnit
          adSlot="3070765905"
          format="autorelaxed"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
