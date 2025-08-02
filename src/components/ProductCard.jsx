import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0], // Pass the first image to the cart
        quantity: 1,
      }),
    );
  };

  return (
    <Card className="w-40 flex flex-col overflow-hidden rounded-lg">
      <CardHeader className="p-0 relative">
        {product.images && product.images.length > 0 && (
          <Link to={`/products/${product.slug}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        )}
      </CardHeader>
      <div className="flex flex-col flex-grow p-2">
        <CardContent className="p-0 flex-grow">
          <Link to={`/products/${product.slug}`}>
            <CardTitle className="text-sm font-semibold leading-tight hover:underline h-10 overflow-hidden">
              {product.name}
            </CardTitle>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            {formatPrice(product.price)}
          </p>
        </CardContent>
        <CardFooter className="p-0 pt-2">
          <Button
            size="sm"
            className="w-full text-xs"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-1 size-3" /> Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="w-40 space-y-2">
      <Skeleton className="h-32 w-full rounded-lg" />
      <div className="p-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="p-2 pt-0">
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
