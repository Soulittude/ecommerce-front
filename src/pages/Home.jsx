import React from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { useProducts } from "../hooks/queries";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HeroCarousel } from "../components/HeroCarousel";

export default function Home() {
  const [searchParams] = useSearchParams();
  const params = {
    category: searchParams.get("category") || undefined,
    page: Number(searchParams.get("page") || 1),
    pageSize: 8,
  };

  const { data: products = [], isLoading, isError } = useProducts(params);

  const carouselItems = [
    {
      imageUrl:
        "https://via.placeholder.com/1200x400/FF0000/FFFFFF?text=Sale+1",
      altText: "Sale 1",
      link: "/products?category=sale",
    },
    {
      imageUrl:
        "https://via.placeholder.com/1200x400/00FF00/FFFFFF?text=New+Arrivals",
      altText: "New Arrivals",
      link: "/products?category=new",
    },
    {
      imageUrl:
        "https://via.placeholder.com/1200x400/0000FF/FFFFFF?text=Best+Sellers",
      altText: "Best Sellers",
      link: "/products?category=best-sellers",
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: params.pageSize }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ));
    }

    if (isError) {
      return (
        <Alert variant="destructive" className="sm:col-span-2 lg:col-span-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem loading the products. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <main className="py-6 mx-auto max-w-screen-xl">
      <div className="mb-8 w-3/5 mx-auto">
        <HeroCarousel items={carouselItems} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {renderContent()}
      </div>
    </main>
  );
}
