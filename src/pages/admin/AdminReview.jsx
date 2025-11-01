import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAllReviews } from "@/hooks/useReviews";



const AdminReviews = () => {
    const { data: reviews = [], isLoading ,isError} = useAllReviews();
  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Error fetching reviews.</p>;

  return (
    <>
     <Link to="/admin" className="flex items-center gap-1 mb-4">
        <ArrowLeft size={20} className="cursor-pointer" />
        Back
      </Link>
    
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">Manage Reviews</h1>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{review.user || review.name}</p>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-500">Rating: ⭐ {review.rating}</p>
            </div>
           
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminReviews;
