import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/queries.js";
import Breadcrumbs from "../components/Breadcrumbs.jsx";
import ImageCarousel from "../components/product_page/ImageCarousel.jsx";
import ProductInfo from "../components/product_page/ProductInfo.jsx";
import ActionButtons from "../components/product_page/ActionButtons.jsx";
import ShippingDetails from "../components/product_page/ShippingDetails.jsx";
import ProductAttributes from "../components/product_page/ProductAttributes.jsx";
import ProductTabs from "../components/product_page/ProductTabs.jsx";
import { Skeleton } from "../components/ui/skeleton.jsx";

const Product = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(productId);

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

  const breadcrumbs = [
    {
      label: product.category.name,
      path: `/category/${product.category.slug}`,
    },
    {
      label: product.name,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs crumbs={breadcrumbs} />
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="w-full md:w-1/2">
          <ImageCarousel images={product.images} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <ProductInfo product={product} />
          <ActionButtons product={product} />
          <ShippingDetails />
          <ProductAttributes attributes={product.attributes} />
        </div>
      </div>
      <div className="mt-8">
        <ProductTabs
          description={product.description}
          reviews={product.reviews}
        />
      </div>
    </div>
  );
};

export default Product;
