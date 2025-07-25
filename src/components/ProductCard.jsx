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
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg">
      <CardHeader className="p-0 relative">
        {product.images && product.images.length > 0 && (
          <Link to={`/products/${product.slug}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link to={`/products/${product.slug}`}>
          <CardTitle className="text-lg font-semibold leading-tight hover:underline">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-muted-foreground mt-2">
          {formatPrice(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 size-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
