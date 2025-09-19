import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
       
        <div className="md:col-span-1">
          <h2 className="text-2xl text-white font-bold  bg-clip-text  mb-4">
            ShopSphere
          </h2>
          <p className="text-gray-400 mb-4">
            Your one-stop destination for curated fashion and lifestyle products. 
            Experience quality, style, and exceptional service.
          </p>
          <div className="flex gap-4">
            <a href="" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="" className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 transition-colors">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="" className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">Home</li>
            <li className="text-gray-400">Shop</li>
            <li className="text-gray-400">Collections</li>
            <li className="text-gray-400">About Us</li>
            <li className="text-gray-400">Contact</li>
        
          </ul>
        </div>

      
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
          <ul className="space-y-2">
            <li className="text-gray-400">FAQ</li>
            <li className="text-gray-400">Returns & Exchanges</li>
            <li className="text-gray-400">Shipping Information</li>
            <li className="text-gray-400">Privacy Policy</li>
            <li className="text-gray-400 ">Terms & Conditions</li>
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