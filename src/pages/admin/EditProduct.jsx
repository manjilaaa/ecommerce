import React from "react";
import { Link } from "react-router-dom";
import { Edit3 } from "lucide-react";
import { useProducts } from "@/hooks/useproducts"; 

const EditProduct = () => {
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) return <p className="p-12 text-gray-500">Loading products...</p>;
  if (isError) return <p className="p-12 text-red-500">Error fetching products.</p>;

  return (
    <div className="p-12 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">Price: Rs. {product.price}</p>
              </div>

              <Link
                to={`/admin/products/edit/${product.id}`}
                className="inline-flex items-center justify-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
              >
                <Edit3 size={18} className="mr-2" /> Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditProduct;
