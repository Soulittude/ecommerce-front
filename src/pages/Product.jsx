import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/queries.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ImageCarousel from "../components/product_page/ImageCarousel.jsx";
import ProductTitle from "../components/product_page/ProductTitle.jsx";
import ProductInfo from "../components/product_page/ProductInfo.jsx";
import ActionButtons from "../components/product_page/ActionButtons.jsx";
import ShippingDetails from "../components/product_page/ShippingDetails.jsx";
import ProductAttributes from "../components/product_page/ProductAttributes.jsx";
import ProductTabs from "../components/product_page/ProductTabs.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";

const Product = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(productId);
  const [activeTab, setActiveTab] = useState("description");
  const tabsRef = useRef(null);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    tabsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8 mt-4">
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full h-[500px]" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-grow" />
              <Skeleton className="h-10 w-24" />
            </div>
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const breadcrumbs = [];
  if (product.category) {
    breadcrumbs.push({
      label: product.category.name,
      path: `/category/${product.category.slug}`,
    });
  }
  breadcrumbs.push({ label: product.name });

  const productAttributes = product.specs
    ? Object.entries(product.specs).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs crumbs={breadcrumbs} />
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="w-full md:w-1/2">
          <ImageCarousel images={product.images || []} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <ProductTitle product={product} onTabSelect={handleTabSelect} />
          <ProductInfo product={product} />
          <ActionButtons product={product} />
          <ShippingDetails />
          <ProductAttributes attributes={productAttributes} />
        </div>
      </div>
      <div className="mt-8" ref={tabsRef}>
        <ProductTabs
          product={product}
          activeTab={activeTab}
          onTabChange={handleTabSelect}
        />
      </div>
    </div>
  );
};

export default Product;
