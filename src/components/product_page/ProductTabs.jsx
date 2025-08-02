import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import ReviewForm from "../ReviewForm";
import ReviewList from "../ReviewList";

const ProductTabs = ({ product, activeTab, onTabChange }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [isReviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setQuestionDialogOpen] = useState(false);
  const [localQuestions, setLocalQuestions] = useState([]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const questionText = e.target.question.value;
    const newQuestion = {
      id: Date.now(), // Temporary ID
      user: { name: user?.name || "You" },
      question: questionText,
      answer: null, // No answer yet
      createdAt: new Date().toISOString(),
    };
    setLocalQuestions([...localQuestions, newQuestion]);
    toast.success("Your question has been submitted!");
    setQuestionDialogOpen(false); // Close dialog
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
          <Dialog open={isReviewDialogOpen} onOpenChange={setReviewDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-6">Write a Review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
              </DialogHeader>
              <ReviewForm
                productSlug={product.slug}
                onReviewSubmitted={() => setReviewDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
      </TabsContent>

      <TabsContent value="qa">
        <div className="border rounded-lg p-4 mt-4">
          <div className="mt-4 space-y-4">
            {localQuestions.map((q) => (
              <div key={q.id}>
                <p className="font-semibold">{q.user.name} asks:</p>
                <p className="ml-4">{q.question}</p>
                <p className="ml-4 text-sm text-muted-foreground italic">
                  Pending a reply from the seller.
                </p>
              </div>
            ))}
          </div>
          {token && (
            <Dialog
              open={isQuestionDialogOpen}
              onOpenChange={setQuestionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="mt-4">Ask a Question</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ask a Question</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleQuestionSubmit}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <Label htmlFor="question">Your Question</Label>
                    <Textarea id="question" name="question" required />
                  </div>
                  <Button type="submit">Submit Question</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
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
