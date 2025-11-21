import React, { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Image, Upload, X } from "lucide-react";

export default function ImageUploader({ onUploadComplete, maxImages = 5 }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = (files) => {
    const selected = Array.from(files).slice(0, maxImages - images.length);
    const previews = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    setUploading(true);

    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i].file;

      const storageRef = ref(storage, `ads/${Date.now()}-${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progressPercent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(progressPercent));
          },
          reject,
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            urls.push(url);
            resolve();
          }
        );
      });
    }

    setUploading(false);
    setProgress(0);
    onUploadComplete(urls);
  };

  return (
    <div className="w-full">
      {/* Drag + drop */}
      <label className="block border border-gray-300 rounded-2xl p-6 text-center cursor-pointer bg-white hover:bg-gray-50">
        <Upload className="mx-auto mb-2 text-gray-500" size={32} />
        <p className="text-gray-700">Click or drag images here</p>
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {/* Preview grid */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img.preview}
              className="w-full h-28 object-cover rounded-xl"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Upload button */}
      {images.length > 0 && !uploading && (
        <button
          onClick={uploadImages}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl"
        >
          Upload Images
        </button>
      )}

      {/* Progress bar */}
      {uploading && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">
            Uploading… {progress}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
