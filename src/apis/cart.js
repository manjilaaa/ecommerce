import axios from "axios";

const BASE_URL = "http://localhost:5000/cart";


export const fetchCart = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};


export const addToCart = async (item) => {
  const { data } = await axios.post(BASE_URL, item);
  return data;
};


export const removeFromCart = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
};


export const updateCartItem = async (id, updatedItem) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, updatedItem);
  return data;
};
