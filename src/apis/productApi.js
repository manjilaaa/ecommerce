import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchProducts = async () => {
  const { data } = await axios.get(`${BASE_URL}/products`);
  return data;
};


export const fetchProduct = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/products/${id}`);
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axios.post(`${BASE_URL}/products`, product);
  return data;
};


export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return true;
};



export const updateProduct = async (id, updatedData) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return await res.json();
};

