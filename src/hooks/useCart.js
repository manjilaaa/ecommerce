import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCart, addToCart as apiAddToCart, removeFromCart, updateCartItem } from "@/apis/cart";
import { toast } from "sonner";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const addItemMutation = useMutation({
    mutationFn: apiAddToCart,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const removeItemMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ id, item }) => updateCartItem(id, item),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

 const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    updateItemMutation.mutate(
      {
        id: existingItem.id,
        item: { ...existingItem, quantity: existingItem.quantity + product.quantity },
      },
      {
        onSuccess: () =>
          toast.success(`Added ${product.quantity} more ${product.name}!`),
        onError: () => toast.error("Failed to update cart."),
      }
    );
  } else {
    addItemMutation.mutate(product, {
      onSuccess: () => toast.success(`Added ${product.quantity} ${product.name} to cart!`),
      onError: () => toast.error("Failed to add product to cart."),
    });
  }
};


  return {
    cartItems,
    isLoading,
    isError,
   addToCart,    
    removeItem: removeItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
  };
};
