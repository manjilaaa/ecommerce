import React from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Edit3, ListChecks, MessageSquare } from "lucide-react";

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          Admin Panel
        </div>

        <div className="flex items-center space-x-3 p-3 rounded">
          <PlusCircle size={20} />
          <span>Add Product</span>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded">
          <Edit3 size={20} />
          <span>Edit Product</span>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded">
          <ListChecks size={20} />
          <span>Orders</span>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded">
          <MessageSquare size={20} />
          <span>Reviews</span>
        </div>
      </aside>

   
      <main className="flex-1 p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Link
            to="/admin/add-product"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <PlusCircle size={40} className="mb-4 text-blue-600" />
            <span className="font-semibold text-lg">Add Product</span>
          </Link>

          
          <Link
            to="/admin/edit-product"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <Edit3 size={40} className="mb-4 text-yellow-500" />
            <span className="font-semibold text-lg">Edit Product</span>
          </Link>

        
          <Link
            to="/admin/orders"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <ListChecks size={40} className="mb-4 text-green-500" />
            <span className="font-semibold text-lg">Orders</span>
          </Link>

        
          <Link
            to="/admin/reviews"
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <MessageSquare size={40} className="mb-4 text-red-500" />
            <span className="font-semibold text-lg">Reviews</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
