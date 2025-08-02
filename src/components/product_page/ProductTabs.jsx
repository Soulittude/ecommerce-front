import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductTabs = ({ description, reviews }) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({reviews?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="shipping">Shipment & Payment</TabsTrigger>
        <TabsTrigger value="returns">Safety & Returns</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        {description || "No description available."}
      </TabsContent>
      <TabsContent value="reviews">
        {/* Review components will go here */}
        {reviews?.length > 0 ? `${reviews.length} reviews` : "No reviews yet."}
      </TabsContent>
      <TabsContent value="shipping">
        <p>
          Information about shipping and payment methods will be displayed here.
          This is currently static placeholder content.
        </p>
      </TabsContent>
      <TabsContent value="returns">
        <p>
          Information about product safety, warranty, and return policies will
          be displayed here. This is currently static placeholder content.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
