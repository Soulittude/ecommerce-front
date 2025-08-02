import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/queries";
import { useSeoData } from "../hooks/useSeoData";
import Seo from "@/components/Seo.jsx";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Product() {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);
  const dispatch = useDispatch();
  const seoData = useSeoData("product", slug);

  if (isLoading)
    return (
      <Card className="p-4 max-w-3xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-full rounded-md" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-48 w-full rounded-md" />
          <Skeleton className="h-6 w-1/3 rounded-md" />
          <Skeleton className="h-10 w-1/4 rounded-md" />
        </CardContent>
      </Card>
    );
  if (isError)
    return (
      <Card className="p-4 max-w-3xl mx-auto">
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Product not found. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );

  const title = product?.name ? `${product.name} | E-Commerce` : seoData.title;
  const description = product?.description || seoData.description;

  return (
    <>
      <Card className="p-4 max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
          <Button
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
            className="mt-4" // Added margin-top for spacing
          >
            Add to Cart
          </Button>

          <section>
            <h2 className="text-2xl font-semibold">Description</h2>
            <p>{product.description}</p>
          </section>

          {product.specs && (
            <section>
              <h2 className="text-2xl font-semibold">Specifications</h2>
              <ul className="list-disc list-inside">
                {product.specs && typeof product.specs === "object" && (
                  <ul className="list-disc list-inside">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <li key={key}>
                        <strong>{key}</strong>: {val}
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </section>
          )}

          <section className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <ReviewList slug={slug} />
            <ReviewForm slug={slug} />
          </section>
        </CardContent>
      </Card>
      <Seo
        title={title}
        description={description}
        url={`/products/${slug}`}
        image={product?.images?.[0]}
      />
    </>
  );
}
