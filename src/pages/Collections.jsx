import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  return data;
};

const Collections = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading collections...</p>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center py-10">
        <p className="text-red-500">Error loading collections.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-blue-600 hover:text-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  );

  const mobile = products.find(p => p.id === "1");
  const shoes = products.find(p => p.id === "3");
  const clothing = products.find(p => p.id === "4");

  const collections = [
    { title: "Mobile", product: mobile },
    { title: "Shoes", product: shoes },
    { title: "Clothing", product: clothing },
  ];

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
    <Navbar/>
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections featuring the finest products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(({ title, product }) => 
            product && (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`} 
                className="group block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 capitalize">{title}</p>
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
            )
          )}
        </div>

       
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Collections;