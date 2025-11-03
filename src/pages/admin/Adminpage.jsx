import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Edit3, ListChecks, MessageSquare,View } from "lucide-react";
import { useProducts } from "@/hooks/useproducts";
import { useOrders } from "@/hooks/useOrders";
import DashboardChart from "./DashboardChart";

const AdminPage = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { orders = [], isLoading: ordersLoading } = useOrders();

  const totalProducts = products.length;
  const totalOrders = orders.length;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
     
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          Admin Panel
        </div>

        <div className="p-3">
          <Link to="/admin/add-product" className="flex items-center space-x-2 text-white">
            <PlusCircle size={20} /> <span>Add Product</span>
          </Link>
        </div>

        <div className="p-3">
          <Link to="/admin/edit-product" className="flex items-center space-x-2 text-white">
            <View size={20} /> <span>View Products</span>
          </Link>
        </div>

        <div className="p-3">
          <Link to="/admin/orders" className="flex items-center space-x-2 text-white">
            <ListChecks size={20} /> <span>Orders</span>
          </Link>
        </div>

        <div className="p-3">
          <Link to="/admin/reviews" className="flex items-center space-x-2 text-white">
            <MessageSquare size={20} /> <span>Reviews</span>
          </Link>
        </div>
      </aside>

     
      <main className="flex-1 p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {productsLoading ? "..." : totalProducts}
            </p>
          </div>

       
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              {ordersLoading ? "..." : totalOrders}
            </p>
            
          </div>
          <div > 
            <DashboardChart/>

          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
