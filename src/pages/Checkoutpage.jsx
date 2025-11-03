import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const { cartItems, removeItem } = useCart();
  const { addOrder } = useOrders();

  const user = JSON.parse(localStorage.getItem("user"));

  const [shippingAddress, setShippingAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  const handlePlaceOrder = async () => {
    if (!cartItems.length || !shippingAddress) return alert("Please add a shipping address");

    const order = {
      userId: user.id,
      items: cartItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
      total: totalPrice,
      status: "Pending",
      payment,
      shippingAddress,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await addOrder(order);
      cartItems.forEach((item) => removeItem(item.id));
      alert("Order placed successfully!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Navbar />

     
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-50">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-12 gap-8 px-4">
       
        <div className="flex-1 bg-white p-10 mt-12 lg:mt-0 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
          <p className="mb-2 font-medium">{user?.name}</p>
          <p className="mb-4 text-gray-600">{user?.email}</p>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <input
              type="text"
              placeholder="Enter your shipping address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Delivery</h3>
            <p>Estimated Delivery: 1 - 2 days</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Select Payment Option</h3>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <Button onClick={handlePlaceOrder} disabled={loading} className="w-full mt-4">
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>

      
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-12 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
