import React from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/queries";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: products, isLoading, error } = useProducts({ search: query });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {products && products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found for "{query}".</p>
      )}
    </div>
  );
}
