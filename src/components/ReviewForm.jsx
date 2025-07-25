import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useCreateReview } from "../hooks/queries";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const reviewFormSchema = z.object({
  rating: z.string({
    required_error: "Please select a rating.",
  }),
  comment: z
    .string()
    .max(500, "Comment must be 500 characters or less.")
    .optional(),
});

export default function ReviewForm({ slug }) {
  const { mutateAsync, isPending, isError, error } = useCreateReview(slug);

  const form = useForm({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: "5",
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      await mutateAsync({
        rating: Number(values.rating),
        comment: values.comment,
      });
      form.reset();
    } catch (err) {
      // The isError and error state from the useCreateReview hook will display the error
      console.error("Failed to submit review:", err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-8 border-t pt-6"
      >
        <h3 className="text-xl font-semibold">Leave a Review</h3>

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <SelectItem key={r} value={String(r)}>
                      {r} Star{r > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts about the product..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Review"}
        </Button>

        {isError && (
          <p className="text-sm font-medium text-destructive">
            {error.message || "An unexpected error occurred."}
          </p>
        )}
      </form>
    </Form>
  );
}
