import api from "./apiClient";

export const fetchReviews = async ({ queryKey }) => {
  const [_key, slug] = queryKey;
  const { data } = await api.get(`/products/${slug}/reviews`);
  return data;
};

export const createReview = async ({ slug, review }) => {
  const { data } = await api.post(`/products/${slug}/reviews`, review);
  return data;
};
