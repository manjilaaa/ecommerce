import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async () => {
  const {data} = await axios.get(`${API_URL}/users`);
  return data;
};