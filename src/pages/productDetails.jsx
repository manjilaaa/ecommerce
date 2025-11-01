import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useProduct } from "@/hooks/useproducts";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlistItems, addItem, removeItem, isMutating } = useWishlist();
  const { data: product, isLoading } = useProduct(id);

  const isInWishlist = (productId) => wishlistItems?.some((item) => item.id === productId);

  const handleWishlistClick = async (product) => {
    try {
      if (isInWishlist(product.id)) {
        await removeItem.mutateAsync(product.id);
        toast.success("Removed from wishlist");
      } else {
        await addItem.mutateAsync(product);
        toast.success("Added to wishlist");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 pt-28 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );

  if (!product)
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 pt-28 text-center">
          <div className="text-red-500 bg-red-50 p-6 rounded-lg">
            <p className="text-lg font-semibold">Product not found</p>
            <Link to="/products" className="text-blue-600 hover:underline mt-2 inline-block">
              Return to products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 min-h-screen">
        <Link to="/products" className="inline-flex items-center hover:text-blue-700 mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            <div className="text-3xl font-bold text-gray-900">${product.price}</div>

            <div className="flex space-x-4 mt-4">
              <Button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                onClick={() => handleWishlistClick(product)}
                disabled={isMutating}
                className={`p-3 border ${
                  isInWishlist(product.id)
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Heart size={20} className={isInWishlist(product.id) ? "fill-current" : ""} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
