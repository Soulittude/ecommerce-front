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

export const searchProducts = async ({ query, pageParam = 1 }) => {
  const response = await api.get(`/products?q=${query}&page=${pageParam}`);
  return response.data;
};

export const getProductsByCategory = async ({ slug, pageParam = 1 }) => {
  const response = await api.get(
    `/products?category=${slug}&page=${pageParam}`,
  );
  return response.data;
};
