import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const fetchCart = async () => {
  const { data } = await axios.get(`${API_URL}/cart/`);
  return data;
};


export const addToCart = async (item) => {
  const { data } = await axios.post(`${API_URL}/cart/`, item);
  return data;
};


export const removeFromCart = async (id) => {
  const { data } = await axios.delete(`${API_URL}/cart/${id}`);
  return data;
};


export const updateCartItem = async (id, updatedItem) => {
  const { data } = await axios.put(`${API_URL}/cart/${id}`, updatedItem);
  return data;
};
