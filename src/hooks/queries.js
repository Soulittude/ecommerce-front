import { useQuery } from "@tanstack/react-query";
import * as api from "../api/products";

export const useProducts = (params) =>
  useQuery(["products", params], api.fetchProducts, {
    keepPreviousData: true,
  });

export const useProduct = (slug) =>
  useQuery(["product", slug], api.fetchProduct, {
    enabled: Boolean(slug),
  });
