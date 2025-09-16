import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
       
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-lime-600 to-amber-500 bg-clip-text text-transparent mb-4">
            ShopMore
          </h2>
          <p className="text-gray-400 mb-4">
            Your one-stop destination for curated fashion and lifestyle products. 
            Experience quality, style, and exceptional service.
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-lime-600 transition-colors">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition-colors">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Shop</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Collections</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">About Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Contact</a></li>
          </ul>
        </div>

      
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">FAQ</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Returns & Exchanges</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Shipping Information</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-lime-400 transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

       
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-400">
              <div className="bg-gray-800 p-2 rounded-full">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <span>support@shop.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <div className="bg-gray-800 p-2 rounded-full">
                <FaPhone className="w-4 h-4" />
              </div>
              <span>+977 123456789</span>
            </div>
          </div>

        
        </div>
      </div>

    
      <div className="border-t border-gray-800 pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Shop. All rights reserved.
          </p>
          
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;