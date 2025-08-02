import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>Product Category</CardDescription>
      </CardHeader>
      <CardContent>
        <p>$99.99</p>
        <p>This is a brief description of the product.</p>
      </CardContent>
    </Card>
  );
};

export default ProductInfo;
