import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductTabs = ({ description, reviews }) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({reviews?.length || 0})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        {description || "No description available."}
      </TabsContent>
      <TabsContent value="reviews">
        {/* Review components would go here */}
        {reviews?.length > 0 ? `${reviews.length} reviews` : "No reviews yet."}
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
