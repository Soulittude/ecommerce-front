import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams();

  return (
    <div className="container mx-auto">
      {/* Breadcrumbs will go here */}
      <h1 className="text-3xl font-bold my-4">Category: {slug}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="col-span-1">
          {/* Filters will go here */}
          <p>Filters placeholder</p>
        </div>
        <div className="col-span-3">
          {/* ProductGrid will go here */}
          <p>Product Grid placeholder</p>
        </div>
      </div>
      {/* SEO component will go here */}
    </div>
  );
};

export default CategoryPage;
