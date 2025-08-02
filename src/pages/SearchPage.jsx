import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/products";
import ProductGrid from "../components/ProductGrid";
import Filters from "../components/Filters";
import Breadcrumbs from "../components/Breadcrumbs";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products", "search", query],
    queryFn: ({ pageParam = 1 }) => searchProducts({ query, pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const crumbs = [{ label: `Search results for "${query}"` }];

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="col-span-1">
          <Filters />
        </div>
        <div className="col-span-3">
          <h1 className="text-3xl font-bold mb-4">
            Search results for "{query}"
          </h1>
          <ProductGrid
            products={data?.pages}
            isLoading={status === "loading"}
            isError={status === "error"}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
