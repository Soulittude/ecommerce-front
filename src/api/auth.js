import api from "./apiClient";

export const registerUser = async (payload) => {
  const { data } = await api.post("auth/register", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post("auth/login", payload);
  return data;
};

export const fetchCurrentUser = async (payload) => {
  const { data } = await api.post("auth/me", payload);
  return data;
};
