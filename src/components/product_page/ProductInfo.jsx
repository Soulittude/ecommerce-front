import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "./ProductPrice";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  return <ProductPrice price={product.price} salePrice={product.salePrice} />;
};

export default ProductInfo;
