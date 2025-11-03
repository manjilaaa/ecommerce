import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/apis/productApi";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      
      queryClient.invalidateQueries(["products"]);
    },
  });
};
