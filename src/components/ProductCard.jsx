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
    <Link to={`/products/${product.slug}`} className="block">
      <div className="border rounded p-4 hover:shadow flex flex-col">
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-32 object-cover mb-2 rounded"
          />
        )}
        <h3 className="font-medium mb-1 flex-1">{product.name}</h3>
        <p className="text-gray-700 mb-2">{product.price} ₺</p>
        <button
          onClick={handleAddToCart}
          className="mt-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}
