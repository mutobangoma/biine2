import React, { useState } from "react";
import { storage } from "../../firebase/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Upload, X } from "lucide-react";

export default function ImageUploader({ onChange }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setUploading(true);

    for (let file of files) {
      const storageRef = ref(storage, `ads/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.round(prog));
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updated = [...images, downloadURL];
            setImages(updated);
            onChange && onChange(updated);
            setUploading(false);
            setProgress(0);
          });
        }
      );
    }
  };

  const removeImage = (url) => {
    const updated = images.filter((img) => img !== url);
    setImages(updated);
    onChange && onChange(updated);
  };

  return (
    <div className="w-full">
      {/* Upload Box */}
      <label className="flex flex-col items-center justify-center border border-gray-300 rounded-xl py-8 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
        <Upload className="w-10 h-10 text-gray-500 mb-2" />
        <p className="text-gray-600">Click to upload images</p>
        <p className="text-xs text-gray-400">Max 5 images</p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSelect}
        />
      </label>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full mt-3 bg-gray-200 rounded-full h-2">
          <div
            className="h-2 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Previews */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((url) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt="uploaded"
                className="h-28 w-full object-cover rounded-lg border"
              />
              <button
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
