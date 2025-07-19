import api from "./apiClient";

export const fetchOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const fetchOrder = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const createOrder = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};
