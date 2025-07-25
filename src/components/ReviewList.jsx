import React from "react";
import { useReviews } from "../hooks/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ReviewList({ slug }) {
  const { data: reviews = [], isLoading, isError } = useReviews(slug);

  if (isLoading)
    return (
      <div className="p-4">
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
    );
  if (isError)
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error loading reviews</AlertDescription>
      </Alert>
    );
  if (reviews.length === 0)
    return (
      <Alert className="m-4">
        <AlertTitle>No Reviews</AlertTitle>
        <AlertDescription>No reviews yet</AlertDescription>
      </Alert>
    );

  return (
    <ul className="space-y-4 p-4">
      {reviews.map((review) => (
        <Card key={review.id} className="border p-4 rounded">
          <CardContent>
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">Rating:</span>
              <span>{review.rating}/5</span>
            </div>
            {review.comment && (
              <p className="text-gray-700">{review.comment}</p>
            )}
            <div className="text-sm text-gray-500 mt-2">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </ul>
  );
}
