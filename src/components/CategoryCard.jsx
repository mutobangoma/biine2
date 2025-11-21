import { Link } from "react-router-dom";

export default function CategoryCard({ title, image }) {
  return (
    <Link to={`/ads/${title.toLowerCase()}`}>
      <div className="bg-white rounded-2xl shadow-biine overflow-hidden flex flex-col items-center text-center p-4 cursor-pointer hover:shadow-lg transition">
        <div className="w-full h-28 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full" />
          ) : (
            <div className="text-gray-400">{title}</div>
          )}
        </div>
        <div className="text-sm font-medium text-gray-700">{title}</div>
      </div>
    </Link>
  );
}
