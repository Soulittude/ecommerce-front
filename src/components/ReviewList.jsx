import React from "react";
import { useReviews } from "../hooks/queries";

export default function ReviewList({ slug }) {
  const { data: reviews = [], isLoading, isError } = useReviews(slug);

  if (isLoading) return <div className="p-4">Loading reviews...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error loading reviews</div>;
  if (reviews.length === 0) return <div className="p-4">No reviews yet</div>;

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="border p-4 rounded">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">Rating:</span>
            <span>{review.rating}/5</span>
          </div>
          {review.comment && <p className="text-gray-700">{review.comment}</p>}
          <div className="text-sm text-gray-500 mt-2">
            {new Date(review.created_at).toLocaleDateString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
