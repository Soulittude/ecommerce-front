import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import ReviewForm from "../ReviewForm";
import ReviewList from "../ReviewList";

const ProductTabs = ({ product, activeTab, onTabChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    console.log("Question submitted:", e.target.question.value);
    toast.success("Your question has been submitted!");
    setShowQuestionForm(false);
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">
          Reviews ({product.reviews?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="qa">Q&A</TabsTrigger>
        <TabsTrigger value="shipping">Shipment & Payment</TabsTrigger>
        <TabsTrigger value="returns">Safety & Returns</TabsTrigger>
      </TabsList>

      <TabsContent value="description">
        {product.description || "No description available."}
      </TabsContent>

      <TabsContent value="reviews">
        <ReviewList slug={product.slug} />
        {token && (
          <div className="mt-6">
            <Button onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? "Cancel" : "Write a Review"}
            </Button>
            {showReviewForm && (
              <div className="mt-4">
                <ReviewForm
                  productSlug={product.slug}
                  onReviewSubmitted={() => setShowReviewForm(false)}
                />
              </div>
            )}
          </div>
        )}
      </TabsContent>

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

      <TabsContent value="shipping">
        <p>
          Information about shipping and payment methods will be displayed here.
        </p>
      </TabsContent>

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
