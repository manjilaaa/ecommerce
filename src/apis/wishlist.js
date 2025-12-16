import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const fetchWishlist = async () => {
  const { data } = await axios.get(`${API_URL}/wishlist`);
  return data;
};


export const addToWishlist = async (item) => {
  const { data } = await axios.post(`${API_URL}/wishlist`, item);
  return data;
};


export const removeFromWishlist = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/wishlist/${id}`);
  return data;
};
