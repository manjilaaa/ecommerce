import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:5000/products");
  return data;
};

const Collections = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 py-10">Error loading collections.</p>;

 
  const mobile = products.find(p => p.id === "1");
  const shoes = products.find(p => p.id === "3");
  const clothing = products.find(p => p.id === "4");

  const collections = [
    { title: "Mobile", product: mobile },
    { title: "Shoes", product: shoes },
    { title: "Clothing", product: clothing },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-lime-600 to-amber-500 bg-clip-text text-transparent">
        Our Collections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(({ title, product }) => 
          product && (
            <Link key={product.id} to={`/products/${product.id}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100">
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{title}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-lime-600">${product.price}</span>
                    <Button variant="secondary">
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Collections;
