import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/queries";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

export default function Product() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);
  const dispatch = useDispatch();

  if (isLoading) return <div className="p-4">Loading Product...</div>;
  if (isError) return <div className="p-4">Product Not Found</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      {/*image carousel (basic)*/}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {product.images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${product.name} ${i + 1}`}
            className="h-48 w-auto rounded"
          />
        ))}
      </div>

      <p className="text-xl font-semibold">${product.price}</p>
      <button
        onClick={() =>
          dispatch(
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            }),
          )
        }
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>

      <section>
        <h2 className="text-2xl font-semibold">Description</h2>
        <p>{product.description}</p>
      </section>

      {product.specs && (
        <section>
          <h2 className="text-2xl font-semibold">Specifications</h2>
          <ul className="list-disc list-inside">
            {Array.isArray(product.specs)
              ? product.specs.map((spec, i) => (
                  <li key={i} className="text-xl">
                    {spec}
                  </li>
                ))
              : typeof product.specs === "string"
                ? product.specs.split("\n").map((line, i) => (
                    <li key={i} className="text-xl">
                      {line}
                    </li>
                  ))
                : null}
          </ul>
        </section>
      )}
      {/*reviews & review form*/}
    </div>
  );
}
