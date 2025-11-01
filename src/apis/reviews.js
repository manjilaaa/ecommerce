import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchReviews = async (productId) => {
  const { data } = await axios.get(
    `${BASE_URL}/reviews?productId=${productId}`
  );
  return data;
};

export const addReview = async (newReview) => {
  const { data } = await axios.post(`${BASE_URL}/reviews`, newReview);
  return data;
};

export const fetchAllReviews = async () => {
  const { data } = await axios.get(`${BASE_URL}/reviews`);
  return data;
};

