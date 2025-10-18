import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const {
    title,
    price,
    stock_status,
    stock_quantity,
    category,
    tags,
    on_sale,
    created_at,
    brand,
    rating,
  } = product;

  return (
    <div className="bg-white shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl p-5 w-72 m-4 border border-gray-100 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h3>

        {brand && (
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-medium text-gray-700">Brand:</span> {brand}
          </p>
        )}

        <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-2">
          ₹{price ? parseFloat(price).toFixed(2) : "N/A"}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(rating || 0) ? "currentColor" : "none"}
                className={i < Math.round(rating || 0) ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating ? rating.toFixed(1) : "0.0"}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-800">Status:</span>{" "}
            <span
              className={`${
                stock_status === "instock" ? "text-green-600" : "text-red-500"
              } font-medium`}
            >
              {stock_status}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Quantity:</span>{" "}
            {stock_quantity ?? "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Category:</span>{" "}
            {category || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Tags:</span>{" "}
            {tags?.length ? (
              <span className="text-gray-700 italic">{tags.join(", ")}</span>
            ) : (
              "None"
            )}
          </p>
          <p>
            <span className="font-semibold text-gray-800">On Sale:</span>{" "}
            <span
              className={`${
                on_sale ? "text-green-500" : "text-gray-500"
              } font-medium`}
            >
              {on_sale ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Created on {new Date(created_at).toLocaleDateString()}
        </p>
        {on_sale && (
          <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
            SALE
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
