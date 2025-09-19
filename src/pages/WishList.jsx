import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { Link } from "react-router-dom";
import { Heart, Trash2, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {wishlistItems.length === 0 
              ? "Your favorite items will appear here" 
              : `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} in your wishlist`}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Heart className="text-gray-400" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Start adding items you love to your wishlist</p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.name || item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 capitalize">{item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${item.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={20} />
                      </button>
                      <Link
                        to={`/products/${item.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="View product"
                      >
                        <Eye size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;