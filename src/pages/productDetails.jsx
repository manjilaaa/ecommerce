import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronUp, ChevronDown } from "lucide-react";

const reviewSchema = z.object({
  user: z.string().min(1,"Enter your name"),
  comment: z.string().min(5, "Make sure to leave a review"),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(reviewSchema) });
  const onSubmit = (data) => {
    mutation.mutate({
      productId: parseInt(id),
      ...data,
    });
  };
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const queryClient = useQueryClient();

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
    },
  });

 
  if (loadingProduct)
    return <p className="text-center py-10">Loading product...</p>;
  if (!product)
    return <p className="text-center py-10 text-red-500">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-3">{product.category}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-2xl font-bold text-lime-600 mb-6">
            ${product.price}
          </p>

          <Button variant="secondary">Add to Cart</Button>
          <div className="mb-4 flex pt-4 gap-3">
  <label className="block  font-medium text-gray-700 pt-1">Quantity</label>
  <Input
    type="number"
    value={quantity}
    min="1"
    onChange={(e) => setQuantity(Number(e.target.value))}
    className="w-20 text-center"
  />
</div>

        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <p className="font-semibold text-gray-800">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
              type="text"
              placeholder="Your name"
              {...register("user")}
            
            >
              </Input>
                  {errors.user && (
      <p className="text-red-500 text-sm">{errors.user.message}</p>
    )}
            
            <Textarea
              placeholder="Your Review"
               {...register("comment")}

            >
                 </Textarea>
              {errors.comment && (
    <p className="text-red-500 text-sm">{errors.comment.message}</p>
  )}
         
            <Button
              type="submit"
              variant="secondary"
              disabled={mutation.isPending}
            >
              {" "}
              {mutation.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
