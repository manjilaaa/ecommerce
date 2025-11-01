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

