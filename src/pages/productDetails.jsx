import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Heart, ShoppingCart, ArrowLeft, Star, User } from "lucide-react";

const reviewSchema = z.object({
  user: z.string().min(1, "Please enter your name"),
  comment: z.string().min(5, "Review must be at least 5 characters long"),
});

const fetchProduct = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/products/${id}`);
  return data;
};

const fetchReviews = async (id) => {
  const { data } = await axios.get(
    `http://localhost:5000/reviews?productId=${id}`
  );
  return data;
};

const addReview = async (newReview) => {
  const { data } = await axios.post("http://localhost:5000/reviews", newReview);
  return data;
};

const ProductDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(reviewSchema) });

  const onSubmit = (data) => {
    mutation.mutate({ productId: parseInt(id), ...data });
    reset();
  };

  const { data: product, isLoading: loadingProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const { data: reviews, isLoading: loadingReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews(id),
  });

  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      toast.success("Review submitted successfully!");
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.");
    },
  });

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.id === productId);

  const handleWishlistClick = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  if (loadingProduct)
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
       
        <Link 
          to="/products" 
          className="inline-flex items-center  hover:text-blue-700 mb-6"
        >
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
            <div>
              <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="fill-current" />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({reviews?.length || 0} reviews)</span>
            </div>

            <div className="text-3xl font-bold text-gray-900">${product.price}</div>

           
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-gray-700">Quantity:</label>
                <Input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-center"
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    addToCart({ ...product, quantity });
                    toast.success(`Added ${quantity} ${product.name} to cart!`);
                  }}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleWishlistClick(product)}
                  className={`p-3 border ${
                    isInWishlist(product.id) 
                      ? "border-red-300 bg-red-50 text-red-600" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Heart 
                    size={20} 
                    className={isInWishlist(product.id) ? "fill-current" : ""} 
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

  
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Customer Reviews</h2>

          {loadingReviews ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="space-y-6 mb-12">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800">{review.user}</h4>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg mb-12">
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </div>
          )}

         
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Your Review</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name"
                  {...register("user")}
                  className="w-full"
                />
                {errors.user && (
                  <p className="text-red-500 text-sm mt-1">{errors.user.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Share your experience with this product..."
                  rows={4}
                  {...register("comment")}
                  className="w-full"
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;