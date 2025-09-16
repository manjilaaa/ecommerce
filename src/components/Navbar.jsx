import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Heart, } from 'lucide-react';
import { Input } from './ui/input';
import { useCart } from "./context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartItemCount = 0;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-amber-500 bg-clip-text text-transparent">
              ShopMore
            </span>
          </Link>

       
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Shop</Link>
            <Link to="/collections" className="text-gray-700 hover:text-lime-600 transition-colors font-medium">Collections</Link>
           
          </div>

       
          <div className="hidden md:flex items-center space-x-5">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-lime-600 transition-colors"
            >
              <Search size={20} />
            </button>
            
            <Link to="/wishlist" className="text-gray-600 hover:text-lime-600 transition-colors">
              <Heart size={20} />
            </Link>
            
        
            
            <Link to="/cart" className="relative text-gray-600 hover:text-lime-600 transition-colors">
              <ShoppingCart size={20} />
               {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalQuantity}
          </span>
        )}

               
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

        
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 p-1 hover:text-lime-600 transition-colors"
            >
              <Search size={20} />
            </button>
            
            <Link to="/cart" className="relative text-gray-600 p-1 hover:text-lime-600 transition-colors">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 p-1 hover:text-lime-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

       
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100">
            <div className="relative">
             
            <Input type='text' placeholder="Search" >
            </Input>
            </div>
          </div>
        )}

       
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-lime-600 transition-colors font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-2 text-gray-700 hover:text-lime-600 transition-colors font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              className="block py-2 text-gray-700 hover:text-lime-600 transition-colors font-medium" 
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
           
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <Link 
                to="/wishlist" 
                className="flex items-center py-2 text-gray-700 hover:text-lime-600 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={18} className="mr-2" />
                Wishlist
              </Link>
             
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;