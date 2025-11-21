// src/components/ImageGallery.jsx
import React, { useState } from "react";

export default function ImageGallery({ images = [] }) {
  const [index, setIndex] = useState(0);
  const active = images[index] || { url: "/img/placeholder.jpg" };

  return (
    <div>
      <div className="h-72 bg-gray-100 rounded-2xl overflow-hidden">
        <img src={active.url} alt="" className="w-full h-full object-cover" />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-20 h-14 rounded-md overflow-hidden ${i === index ? "ring-2 ring-primary" : ""}`}>
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
