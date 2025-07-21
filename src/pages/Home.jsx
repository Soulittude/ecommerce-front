import React from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/queries";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [searchParams] = useSearchParams();
  const params = {
    category: searchParams.get("category") || undefined,
    page: Number(searchParams.get("page") || 1),
    pageSize: 12,
  };

  const { data: products = [], isLoading, isError } = useProducts(params);

  if (isLoading) return <div className="p-4">Loading products…</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error loading products</div>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
