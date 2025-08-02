import React from "react";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ImageCarousel from "../components/product_page/ImageCarousel.jsx";
import ProductInfo from "../components/product_page/ProductInfo.jsx";
import ActionButtons from "../components/product_page/ActionButtons.jsx";
import ShippingDetails from "../components/product_page/ShippingDetails.jsx";
import ProductAttributes from "../components/product_page/ProductAttributes.jsx";
import ProductTabs from "../components/product_page/ProductTabs.jsx";

const ProductPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="w-full md:w-1/2">
          <ImageCarousel />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <ProductInfo />
          <ActionButtons />
          <ShippingDetails />
          <ProductAttributes />
        </div>
      </div>
      <div className="mt-8">
        <ProductTabs />
      </div>
    </div>
  );
};

export default ProductPage;
