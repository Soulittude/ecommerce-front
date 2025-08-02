import { Star } from "lucide-react";

const ProductTitle = ({ product }) => {
  if (!product) return null;

  const totalReviews = product.reviews?.length || 0;
  const averageRating =
    totalReviews > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        totalReviews
      : 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i <= averageRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />,
      );
    }
    return stars;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center">{renderStars()}</div>
        <span className="text-sm text-muted-foreground">
          ({averageRating.toFixed(1)})
        </span>
        <a
          href="#reviews"
          className="text-sm text-muted-foreground hover:underline"
        >
          {totalReviews} Reviews
        </a>
      </div>
    </div>
  );
};

export default ProductTitle;
