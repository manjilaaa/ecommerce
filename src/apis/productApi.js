import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};


export const fetchProduct = async (id) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axios.post(`${API_URL}/products`, product);
  return data;
};


export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return true;
};



export const updateProduct = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return await res.json();
};

