import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase/firebaseConfig";
import ListingCard from "../components/ListingCard";
import ListingFilter from "../components/ListingFilter";
import AdUnit from "../components/ads/AdUnit";

export default function CategoryAds() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSub = searchParams.get("sub");

  const [ads, setAds] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch category metadata (subcategories)
  useEffect(() => {
    const fetchCategoryMeta = async () => {
      try {
        const snap = await getDocs(collection(db, "categories"));
        const cat = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .find((c) => c.id === category);

        setSubcategories(cat?.subcategories || []);
      } catch (err) {
        console.error("Error loading category metadata", err);
      }
    };
    fetchCategoryMeta();
  }, [category]);

  // Fetch ads (category + optional subcategory)
  const fetchAds = async (filters = {}) => {
    setLoading(true);
    try {
      let q = query(
        collection(db, "ads"),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );

      if (activeSub) {
        q = query(
          collection(db, "ads"),
          where("category", "==", category),
          where("subcategory", "==", activeSub),
          orderBy("createdAt", "desc")
        );
      }

      // Apply filter parameters
      if (filters.category) {
        q = query(q, where("category", "==", filters.category));
      }
      if (filters.minPrice) {
        q = query(q, where("price", ">=", Number(filters.minPrice)));
      }
      if (filters.maxPrice) {
        q = query(q, where("price", "<=", Number(filters.maxPrice)));
      }
      if (filters.hasPhotos) {
        q = query(q, where("images", "!=", []));
      }

      const snap = await getDocs(q);
      setAds(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Error loading ads", err);
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchAds();
  }, [category, activeSub]);

  // SEO
  const title = useMemo(() => {
    const base = category?.charAt(0).toUpperCase() + category?.slice(1);
    return activeSub
      ? `${activeSub} for Sale in Zambia | Biine`
      : `${base} for Sale in Zambia | Biine`;
  }, [category, activeSub]);

  const description = useMemo(() => {
    return activeSub
      ? `Browse ${activeSub.toLowerCase()} listings in ${category}. Buy and sell easily on Biine Zambia.`
      : `Browse ${category} listings in Zambia. Buy and sell easily on Biine Marketplace.`;
  }, [category, activeSub]);

  const canonicalUrl = activeSub
    ? `https://biine.app/category/${category}?sub=${activeSub}`
    : `https://biine.app/category/${category}`;

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://biine.app" },
      { "@type": "ListItem", "position": 2, "name": category, "item": `https://biine.app/category/${category}` },
      ...(activeSub
        ? [{ "@type": "ListItem", "position": 3, "name": activeSub, "item": canonicalUrl }]
        : [])
    ]
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJson)}</script>
      </Helmet>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <h1 className="text-xl font-bold capitalize">
          {activeSub ? `${activeSub} in ${category}` : `Ads in ${category}`}
        </h1>

        {/* Top ad */}
        <AdUnit adSlot="2146914081" format="auto" style={{ display: "block", marginBottom: 20 }} />

        {/* Subcategory pills */}
        {subcategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${
                !activeSub ? "bg-green-600 text-white" : "bg-white"
              }`}
            >
              All
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSearchParams({ sub })}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${
                  activeSub === sub ? "bg-green-600 text-white" : "bg-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Filters + ads */}
        <div className="flex flex-col md:flex-row gap-6">
          <ListingFilter
            categories={subcategories}
            onFilter={(filters) => fetchAds(filters)}
          />

          <div className="flex-1">
            {loading ? (
              <p>Loading ads…</p>
            ) : ads.length === 0 ? (
              <p>No ads found.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {ads.map((ad, i) => (
                  <React.Fragment key={ad.id}>
                    <ListingCard ad={ad} />
                    {(i + 1) % 4 === 0 && (
                      <div className="col-span-2 md:col-span-4">
                        <AdUnit
                          adSlot="3785081773"
                          format="fluid"
                          layoutKey="-gw-3+1f-3d+2z"
                          style={{ display: "block" }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom multiplex ad */}
        <AdUnit adSlot="3070765905" format="autorelaxed" style={{ display: "block", marginTop: 24 }} />

        {/* Indexable text for SEO */}
        <p className="text-sm text-gray-600 mt-6">
          Browse verified {activeSub || category} listings across Zambia. Biine lets you buy and sell
          safely with local sellers in Lusaka, Ndola, Kitwe, Livingstone, and more.
        </p>
      </div>
    </>
  );
}
