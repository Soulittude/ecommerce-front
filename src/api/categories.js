import api from "./apiClient";

export const fetchCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};
