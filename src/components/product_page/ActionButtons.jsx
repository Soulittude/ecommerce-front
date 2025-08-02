import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem as addToCart } from "../../store/cartSlice";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const ActionButtons = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`${product.name} has been added to your cart.`);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    navigate("/cart");
  };

  const handleFavorite = () => {
    // Placeholder for future wishlist functionality
    console.log("Added to favorites:", product.id);
    toast.info("Favorite functionality is not yet implemented.");
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleAddToCart} className="flex-grow">
        Add to Cart
      </Button>
      <Button onClick={handleBuyNow} variant="secondary">
        Buy Now
      </Button>
      <Button onClick={handleFavorite} variant="outline" size="icon">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ActionButtons;
