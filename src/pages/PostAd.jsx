import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuthContext } from "../context/AuthContext";

import ImageUploader from "../components/ads/ImageUploader";
import AdUnit from "../components/ads/AdUnit"; // <-- ADD THIS

export default function PostAd() {
  const { user } = useAuthContext();
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await addDoc(collection(db, "ads"), {
        title,
        category,
        price,
        desc,
        images: imageURLs,
        userId: user.uid,
        createdAt: serverTimestamp(),
        status: "active",
      });

      setLoading(false);
      setStep(5);

    } catch (err) {
      console.error(err);
      alert("Failed to post ad.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg">

        <h2 className="text-xl font-semibold mb-4">Post a Free Ad</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">1. Choose a Category</h3>

            <option value="vehicles">Vehicles</option>
            <option value="property">Property</option>
            <option value="electronics">Electronics</option>
            <option value="jobs">Jobs</option>
            <option value="fashion">Fashion</option>
            <option value="pets">Pets</option>


            {/* AD BELOW STEP 1 */}
            <AdUnit
              adSlot="2146914081"
              format="auto"
              style={{ display: "block", marginTop: 10 }}
            />

            <button
              className="btn btn-primary"
              onClick={() => category && setStep(2)}
            >
              Next →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">2. Ad Details</h3>

            <div>
              <label className="text-sm text-gray-600">Title</label>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                className="input h-32"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="text-sm text-gray-600">Price</label>
              <input
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* INLINE AD */}
            <AdUnit
              adSlot="3785081773"
              format="fluid"
              layoutKey="-gw-3+1f-3d+2z"
              style={{ display: "block", marginTop: 10 }}
            />

            <div className="flex justify-between">
              <button className="btn" onClick={() => setStep(1)}>← Back</button>
              <button
                className="btn btn-primary"
                onClick={() => title && price && setStep(3)}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">3. Upload Photos</h3>

            <ImageUploader
              maxImages={10}
              onUploadComplete={(urls) => {
                setImageURLs(urls);
                alert("Images uploaded ✔");
              }}
            />

            {imageURLs.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {imageURLs.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-full h-28 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}

            {/* INLINE AD */}
            <AdUnit
              adSlot="3785081773"
              format="fluid"
              layoutKey="-gw-3+1f-3d+2z"
              style={{ display: "block", marginTop: 10 }}
            />

            <div className="flex justify-between mt-4">
              <button className="btn" onClick={() => setStep(2)}>← Back</button>
              <button
                className="btn btn-primary"
                onClick={() => setStep(4)}
                disabled={imageURLs.length === 0}
              >
                Review →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Ad</h3>

            <div className="border p-3 rounded-lg">
              <p><strong>Title:</strong> {title}</p>
              <p><strong>Category:</strong> {category}</p>
              <p><strong>Price:</strong> {price}</p>
              <p><strong>Description:</strong> {desc}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
              {imageURLs.map((src, i) => (
                <img key={i} src={src} className="w-full h-28 object-cover rounded-lg border" />
              ))}
            </div>

            {/* MULTIPLEX AD */}
            <AdUnit
              adSlot="3070765905"
              format="autorelaxed"
              style={{ display: "block", marginTop: 15 }}
            />

            <button className="btn" onClick={() => setStep(3)}>← Back</button>

            <button
              className="btn btn-primary w-full mt-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Posting..." : "Publish Ad"}
            </button>
          </div>
        )}

        {/* SUCCESS */}
        {step === 5 && (
          <div className="text-center py-10 space-y-4">
            <h3 className="text-xl font-semibold text-green-600">Your ad is live!</h3>
            <p className="text-gray-600 mt-2">You can now view it on the marketplace.</p>

            {/* MULTIPLEX AT SUCCESS */}
            <AdUnit
              adSlot="3070765905"
              format="autorelaxed"
              style={{ display: "block", marginTop: 20 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
