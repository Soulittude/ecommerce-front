import { Badge } from "@/components/ui/badge";

const ProductAttributes = ({ attributes }) => {
  if (!attributes || attributes.length === 0) {
    return null; // Return null instead of a paragraph for a cleaner look
  }

  return (
    <div className="flex flex-wrap gap-2">
      {attributes.map((attr, index) => (
        <Badge key={index} variant="outline">
          {attr.name}: <strong className="ml-1">{attr.value}</strong>
        </Badge>
      ))}
    </div>
  );
};

export default ProductAttributes;
