import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as ordersAPI from "@/apis/order";

export const useOrders = () => {
  const queryClient = useQueryClient();

  
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersAPI.getOrders,
  });

  
  const addOrderMutation = useMutation({
    mutationFn: ordersAPI.addOrder,
    onSuccess: (newOrder) => {
      
      queryClient.setQueryData(["orders"], (old = []) => [...old, newOrder]);
    },
  });


  const updateOrderMutation = useMutation({
    mutationFn: ({ id, update }) => ordersAPI.updateOrder(id, update),
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["orders"], (old = []) =>
        old.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
      );
    },
  });

  return {
    orders,
    isLoading,
    isError,
    addOrder: addOrderMutation.mutateAsync,
    updateOrder: updateOrderMutation.mutateAsync,
  };
};
