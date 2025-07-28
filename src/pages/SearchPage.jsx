import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useProducts } from "../hooks/queries";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Categories from "../components/Categories"; // Import Categories component

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  const handleCategorySelect = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts({ search: query, category: selectedCategory }); // Pass selectedCategory to useProducts

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ));
    }

    if (isError) {
      return (
        <Alert variant="destructive" className="sm:col-span-2 lg:col-span-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem loading the search results. Please try again
            later.
          </AlertDescription>
        </Alert>
      );
    }

    if (products.length === 0) {
      return (
        <div className="sm:col-span-2 lg:col-span-4">
          <p>No products found for "{query}".</p>
        </div>
      );
    }

    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      <main className="py-6 mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Categories onCategorySelect={handleCategorySelect} />{" "}
        {/* Pass handler and state */}
        {renderContent()}
      </main>
    </div>
  );
}
