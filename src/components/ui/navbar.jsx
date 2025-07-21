import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCategories } from "../../hooks/queries";

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const { data: categories = [], isLoading, isError } = useCategories();

  return (
    <nav className="bg-white shadow p-4 flex items-center">
      <Link to="/" className="text-xl font-bold mr-6">
        MyStore
      </Link>

      {isLoading && <span className="mr-4">Loading categories…</span>}
      {isError && (
        <span className="mr-4 text-red-500">Error loading categories</span>
      )}

      {!isLoading && !isError && (
        <div className="flex space-x-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/?category=${cat.slug}`}
              className={
                searchParams.get("category") === cat.slug
                  ? "font-semibold text-blue-600"
                  : ""
              }
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      <Link to="/cart" className="ml-auto">
        Cart
      </Link>
    </nav>
  );
}
