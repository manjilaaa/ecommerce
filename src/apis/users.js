import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchUsers = async () => {
  const {data} = await axios.get(`${BASE_URL}/users`);
  return data;
};