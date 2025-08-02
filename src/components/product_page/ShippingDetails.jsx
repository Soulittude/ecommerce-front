import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ShippingDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Standard Shipping: 5-7 business days.</p>
      </CardContent>
    </Card>
  );
};

export default ShippingDetails;
