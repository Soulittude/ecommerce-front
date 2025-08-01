import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import { Skeleton } from "./ui/skeleton";
import React from "react";

const ProductGrid = ({
  products,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p>Error loading products.</p>;
  }

  const fetchedProductsCount = products.reduce(
    (total, page) => total + page.products.length,
    0,
  );

  return (
    <InfiniteScroll
      dataLength={fetchedProductsCount}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      }
      endMessage={<p className="text-center my-4">No more products to show.</p>}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((group, i) => (
          <React.Fragment key={i}>
            {group.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductGrid;
