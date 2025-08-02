import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ProductTabs = ({ description, reviews }) => {
  const { token } = useSelector((state) => state.auth);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    // Placeholder for future API call
    console.log("Question submitted:", e.target.question.value);
    toast.success("Your question has been submitted!");
    setShowQuestionForm(false);
  };

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({reviews?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="qa">Q&A</TabsTrigger>
        <TabsTrigger value="shipping">Shipment & Payment</TabsTrigger>
        <TabsTrigger value="returns">Safety & Returns</TabsTrigger>
      </TabsList>

      {/* Description Tab */}
      <TabsContent value="description">
        {description || "No description available."}
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews">
        {reviews?.length > 0 ? `${reviews.length} reviews` : "No reviews yet."}
      </TabsContent>

      {/* Q&A Tab */}
      <TabsContent value="qa">
        <p>Questions and answers about the product will be displayed here.</p>
        {token && (
          <div className="mt-4">
            <Button onClick={() => setShowQuestionForm(!showQuestionForm)}>
              {showQuestionForm ? "Cancel" : "Ask a Question"}
            </Button>
            {showQuestionForm && (
              <form onSubmit={handleQuestionSubmit} className="mt-4 space-y-4">
                <div>
                  <Label htmlFor="question">Your Question</Label>
                  <Textarea id="question" name="question" required />
                </div>
                <Button type="submit">Submit Question</Button>
              </form>
            )}
          </div>
        )}
      </TabsContent>

      {/* Shipping Tab */}
      <TabsContent value="shipping">
        <p>
          Information about shipping and payment methods will be displayed here.
        </p>
      </TabsContent>

      {/* Returns Tab */}
      <TabsContent value="returns">
        <p>
          Information about product safety, warranty, and return policies will
          be displayed here.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
