import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const ActionButtons = ({ product }) => {
  // Add to cart logic would go here
  const handleAddToCart = () => {
    console.log("Added to cart:", product.id);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleAddToCart} className="flex-grow">
        Add to Cart
      </Button>
      <Button variant="secondary">Buy Now</Button>
      <Button variant="outline" size="icon">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ActionButtons;
