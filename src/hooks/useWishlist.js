import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "@/apis/wishlist";

export const useWishlist = () => {
  const queryClient = useQueryClient();

 
  const { data: wishlistItems = [], isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });

 
  const addItem = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
  });


  const removeItem = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
  });

  return {
    wishlistItems,
    isLoading,
    isError,
    addItem,
    removeItem,
  };
};
