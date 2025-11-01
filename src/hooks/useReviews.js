import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchReviews, addReview,fetchAllReviews } from "@/apis/reviews";
import { toast } from "sonner";


export const useReviews = (productId) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviews(productId),
    enabled: !!productId,
  });
};

export const useAddReview = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", productId]);
      toast.success("Review submitted successfully!");
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.");
    },
  });
};

export const useAllReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchAllReviews,
  });
};
