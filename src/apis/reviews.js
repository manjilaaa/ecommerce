import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const fetchReviews = async (productId) => {
  const { data } = await axios.get(
    `${API_URL}/reviews?productId=${productId}`
  );
  return data;
};

export const addReview = async (newReview) => {
  const { data } = await axios.post(`${API_URL}/reviews`, newReview);
  return data;
};

export const fetchAllReviews = async () => {
  const { data } = await axios.get(`${API_URL}/reviews`);
  return data;
};

