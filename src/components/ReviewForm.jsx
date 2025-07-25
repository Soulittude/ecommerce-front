import React, { useState } from "react";
import { useCreateReview } from "../hooks/queries";

export default function ReviewForm({ slug }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { mutateAsync, isPending, isError, error } = useCreateReview(slug);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync({ rating, comment });
      setComment("");
      setRating(5);
      // In a real app, you'd likely trigger a refetch of the reviews list here
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>

      {/* Rating */}
      <div>
        <label htmlFor="rating" className="block mb-1 font-medium">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-2 border rounded bg-white"
          required
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className="block mb-1 font-medium">
          Comment (optional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded"
          placeholder="Share your thoughts about the product..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>

      {/* Error Message */}
      {isError && (
        <div className="text-red-500">
          Error: {error.message || "Could not submit review."}
        </div>
      )}
    </form>
  );
}
