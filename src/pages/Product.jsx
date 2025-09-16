import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  return data;
};

const ProductPage = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
        <span className="ml-4 text-gray-600">Loading products...</span>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
        <p className="text-lg font-semibold">Error fetching products.</p>
        <p className="mt-2">Please try again later.</p>
      </div>
    </div>
  );
   const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 pt-28">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-amber-500 bg-clip-text text-transparent mb-2">
        All Products
      </h1>
     
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
           key={product.id}
          to={`/products/${product.id}`}>
          <div
           
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-3">{product.category}</p>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-lime-600">${product.price}</span>
                <Button variant="secondary" onClick={() => addToCart(product)}>
                           <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
                
              </div>
              
            
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;