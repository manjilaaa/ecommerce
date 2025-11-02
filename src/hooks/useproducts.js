import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { fetchProducts,fetchProduct,addProduct } from "@/apis/productApi";
import { toast } from "sonner";


export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    ...options,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: ()=> fetchProduct(id),
   
    
  });

};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => addProduct(product),
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries(["products"]); 
    },
    onError: () => {
      toast.error("Failed to add product.");
    },
  });
};
