import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from 'lucide-react';
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  return data;
};

const ProductPage = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const { addToCart, cartItems } = useCart();
  
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();

  if (isLoading) return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-600">Loading products...</span>
        </div>
      </div>
      <Footer />
    </>
  );
  
  if (isError) return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center text-red-500 bg-red-50 p-6 rounded-lg">
          <p className="text-lg font-semibold">Error fetching products.</p>
          <p className="mt-2">Please try again later.</p>
        </div>
      </div>
      <Footer />
    </>
  );

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleWishlistClick = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">All Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of high-quality products
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id}
              to={`/products/${product.id}`}
              className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 capitalize">{product.category}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={(e) => handleWishlistClick(product, e)}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isInWishlist(product.id) 
                        ? "text-red-500" 
                        : "text-gray-400 hover:text-red-500"
                    }`}
                    aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      size={20} 
                      className={isInWishlist(product.id) ? "fill-current" : ""} 
                    />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;