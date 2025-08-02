import { Button } from "@/components/ui/button";

const ActionButtons = () => {
  return (
    <div className="flex gap-2">
      <Button>Add to Cart</Button>
      <Button variant="secondary">Buy Now</Button>
      <Button variant="outline">Favorite</Button>
    </div>
  );
};

export default ActionButtons;
