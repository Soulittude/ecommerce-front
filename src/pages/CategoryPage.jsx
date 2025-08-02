import { useParams } from "react-router-dom";
import { useProductsByCategory, useCategories } from "../hooks/queries";
import { useSeoData } from "../hooks/useSeoData";
import Seo from "../components/Seo";
import ProductGrid from "../components/ProductGrid";
import Filters from "../components/Filters";
import Breadcrumbs from "../components/Breadcrumbs";

const CategoryPage = () => {
  const { slug } = useParams();
  const { data: categories } = useCategories();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useProductsByCategory(slug);

  const category = categories?.find((cat) => cat.slug === slug);
  const seoData = useSeoData("categories", slug);

  const crumbs = category ? [{ label: category.name }] : [];

  return (
    <>
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
              {category ? category.name : "Category"}
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
        <Seo
          title={seoData.title}
          description={seoData.description}
          url={`/category/${slug}`}
        />
      </div>
    </>
  );
};

export default CategoryPage;
