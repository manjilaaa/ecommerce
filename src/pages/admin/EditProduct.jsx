import React from "react";
import { Link } from "react-router-dom";
import { Edit3, Trash2 } from "lucide-react";
import { useProducts } from "@/hooks/useproducts"; 

import { ArrowLeft } from "lucide-react"; 


const EditProduct = () => {
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) return <p className="p-12 text-gray-500">Loading products...</p>;
  if (isError) return <p className="p-12 text-red-500">Error fetching products.</p>;

  return (
    <>
    <Link to="/admin" className="flex items-center gap-1 mb-4">
        <ArrowLeft size={20} className="cursor-pointer" />
        Back
      </Link>
    <div className="p-12 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">Rs. {product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-4">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-yellow-500 hover:text-yellow-600"
                      title="Edit Product"
                    >
                      <Edit3 size={18} />
                    </Link>
                    <button
                      className="text-red-500 hover:text-red-600"
                      title="Delete Product"
                      onClick={() => alert(`Delete ${product.name} functionality`)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default EditProduct;
