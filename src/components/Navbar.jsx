import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, Heart, LogOut, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [name, setName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setName(user.name);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-sm py-2" 
        : "bg-white/90 backdrop-blur-sm py-3"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center group">
              <span className="text-2xl font-bold text-gray-800 hover:text-gray-500">
                ShopSphere
              </span>
            </Link>
          </div>

        
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/collections" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

     
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <Search size={20} />
            </button>

            <Link 
              to="/wishlist" 
              className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200 relative hover:bg-gray-100 rounded-full"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 relative hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700">
                <User size={16} />
              </div>
              <p className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                {name}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full"
                onClick={() =>
                  toast("Are you sure you want to logout?", {
                    description: "You'll need to log in again to access your account",
                    action: {
                      label: "Yes, logout",
                      onClick: handleLogout,
                    },
                  })
                }
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>

        
          <div className="md:hidden flex items-center space-x-3">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="p-2 text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              <Search size={20} />
            </button>

            <Link 
              to="/cart" 
              className="p-2 text-gray-600 hover:text-blue-600 relative"
            >
              <ShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-4 animate-fade-in">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 rounded-full border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}

      
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 mt-2 animate-fade-in">
            <Link 
              to="/products" 
              className="flex items-center py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
              Shop
            </Link>
            <Link 
              to="/collections" 
              className="flex items-center py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
              Collections
            </Link>
            <Link 
              to="/wishlist" 
              className="flex items-center py-3 text-gray-700 hover:text-red-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart size={18} className="mr-3" />
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-700 mr-2">
                  <User size={16} />
                </div>
                <p className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                  {name}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                onClick={() => {
                  setIsMenuOpen(false);
                  toast("Are you sure you want to logout?", {
                    description: "You'll need to log in again to access your account",
                    action: {
                      label: "Yes, logout",
                      onClick: handleLogout,
                    },
                  });
                }}
              >
                <LogOut size={18} className="mr-1"  />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
      <Toaster richColors position="top-right" />
    </nav>
  );
};

export default Navbar;