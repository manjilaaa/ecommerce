import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;



export const getOrders = async () => {
  try {
    const res = await axios.get(`${API_URL}/orders`);
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};


export const addOrder = async (order) => {
  try {
    const res = await axios.post(`${API_URL}/orders`, order);
    return res.data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};


export const updateOrder = async (id, update) => {
  try {
    const res = await axios.patch(`${API_URL}/orders/${id}`, update);
    return res.data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    throw error;
  }
};
