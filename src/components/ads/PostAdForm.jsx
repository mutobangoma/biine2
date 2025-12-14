import React, { useState } from "react";
import useCategories from "../../hooks/useCategories";
import { useAuth } from "../../context/AuthContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ImageUploader from "../ads/ImageUploader";
import useLocations from "../../hooks/useLocations";
import { useNavigate } from "react-router-dom";

export default function PostAdForm() {
  const { user, signIn } = useAuth();
  const { categories } = useCategories();
  const { locations } = useLocations();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    category: "",
    subcategory: "",
    location: "",
    sublocation: "",
    images: [],
  });

  const [pendingSubmission, setPendingSubmission] = useState(null);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (imagesArray) => {
    setForm({ ...form, images: imagesArray });
  };

  async function submitAd(e) {
    e.preventDefault();

    if (!user) {
      // Save form data temporarily and prompt login
      setPendingSubmission(form);
      alert("Please log in to post your ad.");
      navigate("/login"); // or use signIn() if you have a login popup
      return;
    }

    const adPayload = {
      ...form,
      price: Number(form.price),
      userId: user.uid,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "ads"), adPayload);
      alert("Your ad has been posted!");
      setForm({
        title: "",
        desc: "",
        price: "",
        category: "",
        subcategory: "",
        location: "",
        sublocation: "",
        images: [],
      });
      setPendingSubmission(null);
    } catch (err) {
      console.error(err);
      alert("Error posting ad");
    }
  }

  // If user just logged in and there is pending submission
  React.useEffect(() => {
    if (user && pendingSubmission) {
      submitAd({ preventDefault: () => {} }); // auto-submit saved form
    }
  }, [user, pendingSubmission]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#007A43] mb-6">Post an Ad on Biine</h1>

      <form
        onSubmit={submitAd}
        className="bg-white shadow-md rounded-xl border border-gray-200 p-6 space-y-6"
      >
        {/* TITLE */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Ad Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handle}
            placeholder="e.g. Toyota Corolla 2015"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00A859] outline-none"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Price (ZMW)</label>
          <input
            name="price"
            value={form.price}
            onChange={handle}
            type="number"
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00A859]"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handle}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#00A859]"
            required
          >
            <option value="">Select Category</option>
            {categories?.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBCATEGORY */}
        {form.category && (
          <div>
            <label className="block mb-1 font-medium text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              value={form.subcategory}
              onChange={handle}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#00A859]"
              required
            >
              <option value="">Select Subcategory</option>
              {categories
                .find((c) => c.id === form.category)
                ?.subcategories?.map((sub) => (
                  <option value={sub} key={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* LOCATION */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Location</label>
          <select
            name="location"
            value={form.location}
            onChange={handle}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#00A859]"
            required
          >
            <option value="">Select Location</option>
            {locations?.map((loc) => (
              <option value={loc.id} key={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBLOCATION */}
        {form.location && (
          <div>
            <label className="block mb-1 font-medium text-gray-700">Sublocation</label>
            <select
              name="sublocation"
              value={form.sublocation}
              onChange={handle}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-[#00A859]"
              required
            >
              <option value="">Select Sublocation</option>
              {locations
                .find((l) => l.id === form.location)
                ?.sublocations?.map((sub) => (
                  <option value={sub} key={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handle}
            placeholder="Describe your item..."
            className="w-full min-h-[120px] border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#00A859]"
            required
          />
        </div>

        {/* IMAGE UPLOADER */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Images</label>
          <ImageUploader onChange={handleImages} />
        </div>

        {/* SUBMIT */}
        <button className="w-full bg-[#00A859] hover:bg-[#007A43] text-white font-semibold py-3 rounded-lg transition">
          Post Ad
        </button>
      </form>
    </div>
  );
}
