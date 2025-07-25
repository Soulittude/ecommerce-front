import api from "./apiClient";

export const fetchProducts = async ({ queryKey }) => {
  const [_key, params] = queryKey;
  const { data } = await api.get("/products", { params });
  return data;
};

export const fetchProduct = async ({ queryKey }) => {
  const [_key, slug] = queryKey;
  const { data } = await api.get(`/products/${slug}`);
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await api.post("/products", payload);
  return data;
};

export const updateProduct = async ({ id, ...payload }) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};
