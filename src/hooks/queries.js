import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import * as authApi from "../api/auth";
import * as categoryApi from "../api/categories";
import * as productApi from "../api/products";
import * as reviewApi from "../api/reviews";
import * as orderApi from "../api/orders";

// === Authentication ===
export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.registerUser,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.jwt);
      qc.setQueryData(["currentUser"], data.user);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      // Optionally, you can show a user-friendly error message here
    },
  });
};

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.loginUser,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.jwt);
      qc.setQueryData(["currentUser"], data.user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Optionally, you can show a user-friendly error message here
    },
  });
};

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: authApi.fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

// === Categories ===
export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: categoryApi.fetchCategories,
    staleTime: 1000 * 60 * 60,
  });

// === Products ===
export const useProducts = (params) =>
  useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.fetchProducts({ queryKey: ["products", params] }),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

export const useProduct = (slug) =>
  useQuery({
    queryKey: ["product", slug],
    queryFn: () => productApi.fetchProduct({ queryKey: ["product", slug] }),
    enabled: Boolean(slug),
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

// === Products by Category (Infinite Scroll) ===
export const useProductsByCategory = (slug) => {
  return useInfiniteQuery({
    queryKey: ["products", "category", slug],
    queryFn: ({ pageParam = 1 }) =>
      productApi.getProductsByCategory({ slug, pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!slug,
  });
};

// === Reviews ===
export const useReviews = (slug) =>
  useQuery({
    queryKey: ["reviews", slug],
    queryFn: () => reviewApi.fetchReviews({ queryKey: ["reviews", slug] }),
    enabled: Boolean(slug),
  });

export const useCreateReview = (slug) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (review) => reviewApi.createReview({ slug, review }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews", slug] }),
  });
};

// === Orders ===
export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.fetchOrders,
    staleTime: 1000 * 60,
    enabled: Boolean(localStorage.getItem("jwt")),
  });

export const useOrder = (id) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: () => orderApi.fetchOrder(id),
    enabled: Boolean(id),
  });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
