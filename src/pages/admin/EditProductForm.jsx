import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProduct } from "@/hooks/useproducts";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";
import { Input } from "@/components/ui/input"; 

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const updateMutation = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "", 
  });


  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(
      { id, data: formData },
      {
        onSuccess: () => {
          alert("✅ Product updated successfully!");
          navigate("/admin/edit-product");
        },
        onError: () => {
          alert("❌ Failed to update product.");
        },
      }
    );
  };

  if (isLoading) return <p className="p-12 text-gray-500">Loading product...</p>;
  if (isError) return <p className="p-12 text-red-500">Error loading product.</p>;

  return (
    <div className="p-12 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg">
        <Link
          to="/admin/edit-product"
          className="flex items-center gap-1 mb-4 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={18} /> Back
        </Link>

        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Price</label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Product Price"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <Input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={updateMutation.isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {updateMutation.isLoading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
