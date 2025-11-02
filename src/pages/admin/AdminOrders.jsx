import React from "react";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useproducts";
import { useUsers } from "@/hooks/useUsers";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 


const AdminOrdersPage = () => {
  const { orders, isLoading: ordersLoading, isError: ordersError } = useOrders();
  const { data: users = [] } = useUsers();
  const { data: products = [] } = useProducts();

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId || u.id == userId);
    return user?.name || "Unknown";
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId || p.id == productId);
    return product?.name || `Product ${productId}`;
  };

  if (ordersLoading) return <p>Loading orders...</p>;
  if (ordersError) return <p className="text-red-600">Failed to load orders</p>;

  return (
    <div>
      <Link to="/admin" className="flex items-center gap-1 mb-4">
        <ArrowLeft size={20} className="cursor-pointer" />
        Back
      </Link>
    
    <div className="p-8 mt-12">
    
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Items</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Payment</th>
              <th className="py-2 px-4 border-b">Shipping Address</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{getUserName(order.userId)}</td>
                <td className="py-2 px-4 border-b">
                  {order.items
                    .map((i) => `${getProductName(i.productId)} x ${i.quantity}`)
                    .join(", ")}
                </td>
                <td className="py-2 px-4 border-b">${order.total}</td>
                <td className="py-2 px-4 border-b">{order.payment || "-"}</td>
                <td className="py-2 px-4 border-b">{order.shippingAddress || "-"}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminOrdersPage;
