import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdUnit from "../components/ads/AdUnit";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function CategoryAds() {
  const { category } = useParams();
  const [ads, setAds] = useState([]);

  useEffect(() => {
  async function loadAds() {
    const q = query(
      collection(db, "ads"),
      where("category", "==", category)
    );

    const snap = await getDocs(q);
    setAds(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  loadAds();
}, [category]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Horizontal Ad */}
      <AdUnit 
        adSlot="2146914081"
        format="auto"
        style={{ display: "block", marginBottom: "20px" }}
      />

      <h1 className="text-xl font-bold mb-4">Ads in {category}</h1>

      {ads.length === 0 ? (
        <p>No ads found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ads.map((ad, i) => (
            <React.Fragment key={ad.id}>
              <ListingCard ad={ad} />

              {/* Insert an inline ad after every 4 items */}
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

      {/* Multiplex bottom */}
      <AdUnit 
        adSlot="3070765905"
        format="autorelaxed"
        style={{ display: "block", marginTop: "20px" }}
      />

    </div>
  );
}
