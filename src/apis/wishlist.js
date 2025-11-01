import axios from "axios";

const BASE_URL = "http://localhost:5000/wishlist";

export const fetchWishlist = async () => {
  const { data } = await axios.get(BASE_URL);
  return data;
};


export const addToWishlist = async (item) => {
  const { data } = await axios.post(BASE_URL, item);
  return data;
};


export const removeFromWishlist = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
};
