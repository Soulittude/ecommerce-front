import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as authApi from "../api/auth";
import * as categoryApi from "../api/categories";
import * as productApi from "../api/products";
import * as reviewApi from "../api/reviews";
import * as orderApi from "../api/orders";

// === Authentication ===
export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation(authApi.registerUser, {
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.jwt);
      qc.setQueryData(["currentUser"], data.user);
    },
  });
};

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation(authApi.loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.jwt);
      qc.setQueryData(["currentUser"], data.user);
    },
  });
};

export const useCurrentUser = () =>
  useQuery(["currentUser"], authApi.fetchCurrentUser, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

// === Categories ===
export const useCategories = () =>
  useQuery(["categories"], categoryApi.fetchCategories, {
    staleTime: 1000 * 60 * 60, // 1 hour
  });

// === Products ===
export const useProducts = (params) =>
  useQuery(["products", params], productApi.fetchProducts, {
    keepPreviousData: true,
    staleTime: 1000 * 60, // 1 minute
  });

export const useProduct = (slug) =>
  useQuery(["product", slug], productApi.fetchProduct, {
    enabled: Boolean(slug),
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation(productApi.createProduct, {
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation(productApi.updateProduct, {
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation(productApi.deleteProduct, {
    onSuccess: () => qc.invalidateQueries(["products"]),
  });
};

// === Reviews ===
export const useReviews = (slug) =>
  useQuery(
    ["reviews", slug],
    () => reviewApi.fetchReviews({ queryKey: ["reviews", slug] }),
    {
      enabled: Boolean(slug),
    },
  );

export const useCreateReview = (slug) => {
  const qc = useQueryClient();
  return useMutation((review) => reviewApi.createReview({ slug, review }), {
    onSuccess: () => qc.invalidateQueries(["reviews", slug]),
  });
};

// === Orders ===
export const useOrders = () =>
  useQuery(["orders"], orderApi.fetchOrders, {
    staleTime: 1000 * 60, // 1 minute
    enabled: Boolean(localStorage.getItem("jwt")),
  });

export const useOrder = (id) =>
  useQuery(["order", id], () => orderApi.fetchOrder(id), {
    enabled: Boolean(id),
  });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation(orderApi.createOrder, {
    onSuccess: () => {
      qc.invalidateQueries(["orders"]);
      qc.invalidateQueries(["cart"]);
    },
  });
};
