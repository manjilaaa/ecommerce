import React from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, isLoading, isError, updateItem, removeItem } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handleQuantityChange = (item, quantity) => {
    if (quantity < 1) return;
    updateItem({ id: item.id, item: { ...item, quantity } });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          <p className="text-red-500">Failed to load cart. Please try again.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Shopping Cart</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {cartItems.length === 0
              ? "Your cart is waiting to be filled with amazing products"
              : `You have ${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <ShoppingBag className="text-gray-400" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Discover our products and add something special</p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const price = item.price || 0;
                const quantity = item.quantity || 1;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <h2 className="font-semibold text-gray-800 text-lg mb-2">{item.name}</h2>
                      <p className="text-gray-600 mb-3">${price.toFixed(2)}</p>

                      <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => handleQuantityChange(item, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="text-gray-700 font-medium w-8 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => handleQuantityChange(item, quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-end space-y-3">
                      <p className="font-medium text-gray-800 text-lg">
                        ${(price * quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

           
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-28">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-800">${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-gray-800">${(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                    <Link to="/checkout" className="w-full">
                <Button variant="destructive" className="w-full">
                  Proceed to Checkout
                </Button>
                </Link>

              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
