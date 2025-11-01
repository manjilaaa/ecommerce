import { useQuery } from "@tanstack/react-query";
import { fetchProducts,fetchProduct } from "@/apis/productApi";

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
}