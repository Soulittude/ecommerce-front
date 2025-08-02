import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.category?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${product.price}</p>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
    </Card>
  );
};

export default ProductInfo;
