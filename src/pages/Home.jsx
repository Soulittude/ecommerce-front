import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/queries";

export default function Home() {
  const [searchParams] = useSearchParams();
  const params = {
    category: searchParams.get("category") || undefined,
    page: Number(searchParams.get("page") || 1),
    pageSize: 12,
  };

  const { data: products = [], isLoading, isError } = useProducts(params);

  if (isLoading) return <div className="p-4">Loading products...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error loading products</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <Link key={p.id} to={`/products/${p.slug}`}>
          <div className="border rounded p-4 hover:shadow">
            {p.images && p.images[0] && (
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
            )}
            <h3 className="font-medium mb-1">{p.name}</h3>
            <p className="text-gray-700 mb-2">{p.price}</p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
