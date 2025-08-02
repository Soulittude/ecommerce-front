import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductTabs = () => {
  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        Full product description goes here.
      </TabsContent>
      <TabsContent value="reviews">Reviews will be displayed here.</TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
