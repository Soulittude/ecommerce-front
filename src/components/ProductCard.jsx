import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      }),
    );
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block transition-transform hover:scale-[1.02]"
    >
      <div className="relative bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-lg rounded-2xl p-5 hover:shadow-2xl shadow-lg border border-white/20 transition-all duration-300 flex flex-col h-full">
        {/* Content wrapper to ensure proper closure */}
        <div className="overflow-hidden rounded-xl mb-4 aspect-square">
          {product.images?.[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>

        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < product.rating ? "text-amber-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {product.price} ₺
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-3 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
