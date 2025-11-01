import React from "react";
import { addProduct } from "@/apis/productApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const adminSchema = z.object({
  name: z.string().min(5, "Give the full product name"),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Enter the correct amount",
    }),
  category: z.enum(["clothing", "shoes", "Mobiles", "laptops", "Headphones"], {
    errorMap: () => ({ message: "Choose a valid category" }),
  }),
  image: z.url("Invalid URL"),
  description: z.string().min(10, "Add at least 10 characters in description"),
});

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminSchema),
  });

  const onSubmit = async (data) => {
    try {
      await addProduct({ ...data, price: Number(data.price) });
      toast.success("Product added successfully!");
      reset();
    } catch {
      toast.error("Failed to add product.");
    }
  };

  return (
    <>
      <Link to="/admin" className="flex items-center gap-1 mb-4">
        <ArrowLeft size={20} className="cursor-pointer" />
        Back
      </Link>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 w-full max-w-md space-y-4 shadow rounded"
        >
          <h1 className="text-xl font-bold text-gray-800">Add Product</h1>

       
          <div>
            <Input placeholder="Product Name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

        
          <div>
            <Input
              type="number"
              placeholder="Price"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

         
          <div>
            <Input placeholder="Category" {...register("category")} />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

       
          <div>
            <Input placeholder="Image URL" {...register("image")} />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

         
          <div>
            <Textarea placeholder="Description" {...register("description")} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button variant="destructive" type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
